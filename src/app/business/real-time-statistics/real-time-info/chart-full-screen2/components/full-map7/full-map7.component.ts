import {Component, OnInit, ViewChild} from '@angular/core';
import {GlobalConst} from '../../../../../../share/global-const';
import {Subscription} from 'rxjs/Subscription';
import {ParkingDynamicEntity, ParkingDynamicsInfoEntity} from '../../../../../data-statistics/data-statistics.model';
import {DataStatisticsHttpService} from '../../../../../data-statistics/data-statistics-http.service';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {ScreenParkingStatePipe} from '../../../../../../share/pipes/parking-state.pipe';
import {Observable} from 'rxjs/Observable';
import {MapMonitorVideoComponent} from '../../../components/map-monitor-video/map-monitor-video.component';

@Component({
  selector: 'app-full-map7',
  templateUrl: './full-map7.component.html',
  styleUrls: ['./full-map7.component.less']
})
export class FullMap7Component implements OnInit {

  private map: any;

  public switchValue = false; // 路况开关

  public parkingList: Array<ParkingDynamicsInfoEntity> = [];
  public markerList = [];
  private mapCompleteEventListener: any;
  private mapZoomStartEventListener: any;
  private mapZoomEndEventListener: any;
  private mapClickEventListener: any;
  private dataSubscription: Subscription;
  private trafficLayer: any;
  private infoWindow: any;
  private isLowestZoom = false;

  private videoReadySubscription: Subscription;
  private keyBoardSubscription: Subscription;
  @ViewChild(MapMonitorVideoComponent) private mapMonitorVideoCpt: MapMonitorVideoComponent;

  constructor(private fullScreenHttpService: DataStatisticsHttpService) {
  }

  ngOnInit() {
    this.initBasicMap();
  }

  /**
   * 初始化地图及组件
   */
  private initBasicMap(): void {
    // 初始化地图
    this.map = new AMap.Map('map-screen-container', {
      resizeEnable: true,
      expandZoomRange: true,
      center: GlobalConst.RegionCenter,
      mapStyle: 'amap://styles/69349e7b00a8bceff4a9be908f70bad9',
      zoom: 12,
      zooms: [11, 18],
      dragEnable: true,
      keyboardEnable: false
    });
    // 实时路况图层
    this.trafficLayer = new AMap.TileLayer.Traffic({zIndex: 10});
    this.trafficLayer.setMap(this.map);
    this.trafficLayer.hide();

    this.initMapEvents();

    // this.initShortCutKey();
  }

  private initMapEvents(): void {
    // 地图图块加载完成后触发事件
    this.mapCompleteEventListener = AMap.event.addListener(this.map, 'complete', () => {
      this.requestAllData();

      this.mapClickEventListener = AMap.event.addListener(this.map, 'click', () => {
        this.map.clearInfoWindow();
        // this.refreshMarkerStatus();
      });

      // 开始缩放
      // this.mapZoomStartEventListener = AMap.event.addListener(this.map, 'zoomstart', () => {
      // });

      // 缩放结束
      this.mapZoomEndEventListener = AMap.event.addListener(this.map, 'zoomend', () => {
        const currentZoom = this.map.getZoom();
        const isLowestZoom = currentZoom >= 16;
        if (isLowestZoom !== this.isLowestZoom) {
          this.isLowestZoom = isLowestZoom;
          this.generateRefreshMarker();
          this.refreshInfoWindow();
        }
      });
    });
  }

  // 请求路内路外停车场列表
  private requestAllData(): void {
    // this.dataSubscription && this.dataSubscription.unsubscribe();
    // const httpList = [
    //   this.fullScreenHttpService.requestInsideDynamicList(),
    //   this.fullScreenHttpService.requestOutsideDynamicList()
    // ];
    // this.dataSubscription = forkJoin(httpList).subscribe((results: Array<Array<ParkingDynamicEntity>>) => {
    //   this.parkingList = [...results[0], ...results[1]];
    //   this.generateRefreshMarker();
    //   this.map.add(this.markerList);
    // });

    this.dataSubscription && this.dataSubscription.unsubscribe();
    this.dataSubscription = this.fullScreenHttpService.requestAllParkingDynamicInfoList(GlobalConst.RegionID).subscribe(results => {
      const parkingList = [];
      results[0].forEach(parkItem => {
        // #54699 地图里不显示已中断停车场泡泡
        if (parkItem.status > 0 && parkItem.run_status !== 2) {
          parkingList.push(parkItem);
          // if (parkItem.tmp_num == '*' || parkItem.parking_tmp_num == '*') {
          //   this.isSimplePermission = true;
          // }
        }
      });
      this.parkingList = parkingList;
      // this.parkingListComplete.emit(parkingList);
      // this.updateParkingData();

      this.generateRefreshMarker();
      this.map.add(this.markerList);
    });
  }

  public onSwitchChange() {
    if (this.switchValue) {
      this.trafficLayer && this.trafficLayer.show();
    } else {
      this.trafficLayer && this.trafficLayer.hide();
    }
  }

  // 初始化快捷键
  private initShortCutKey() {
    // 有视频的情况下，显示视频按钮
    this.videoReadySubscription = this.mapMonitorVideoCpt.ready().subscribe(() => {
      this.keyBoardSubscription && this.keyBoardSubscription.unsubscribe();
      this.keyBoardSubscription = Observable.fromEvent(window, 'keydown').debounceTime(100).subscribe((event: any) => {
        if (event.keyCode === 49) {
          this.mapMonitorVideoCpt.openTmp('c');
        } else if (event.keyCode === 50) {
          this.mapMonitorVideoCpt.openTmp('b');
        } else if (event.keyCode === 51) {
          this.mapMonitorVideoCpt.openTmp('a');
        } else if (event.keyCode === 52) {
          this.videoReadySubscription && this.videoReadySubscription.unsubscribe();
          this.mapMonitorVideoCpt && this.mapMonitorVideoCpt.close();
        } else if (event.keyCode === 53) {
          this.mapMonitorVideoCpt.reset();
        }
      });
    });
  }

  // 生成或更新点标记
  private generateRefreshMarker() {
    if (!this.markerList.length) {
      this.markerList = this.parkingList.map(parking => {
        const position = new AMap.LngLat(Number(parking.parking.lon), Number(parking.parking.lat));
        const marker = new AMap.Marker({
          content: this.generateMarkerContent(parking),
          position,
          // anchor: 'bottom-center',
          offset: new AMap.Pixel(-36, -8),
          extData: {
            parking
          }
        });
        marker.on('click', () => {
          this.renderInfoWindow(parking);
          this.infoWindow.open(this.map, position);
        });
        return marker;
      });
    } else {
      this.markerList.forEach(marker => {
        marker.setContent(this.generateMarkerContent(marker.getExtData().parking));
        const offset = this.isLowestZoom ? new AMap.Pixel(-36, -38) : new AMap.Pixel(-36, -8);
        marker.setOffset(offset);
      });
    }
  }

  // 点标记样式
  private generateMarkerContent(parking: ParkingDynamicsInfoEntity) {
    const markerDiv = document.createElement('div');
    markerDiv.className = 'marker-container';
    // 圆点
    const circleDiv = document.createElement('div');
    circleDiv.className = 'flashing-marker';
    circleDiv.style.background = new ScreenParkingStatePipe().transform(parking.status, true);

    if (this.isLowestZoom) {
      const boxDiv = document.createElement('div');
      const parkingTypeClass = parking.area_type === 1 ? 'inside' : 'outside';
      boxDiv.className = `marker-box ${parkingTypeClass}`;
      boxDiv.innerHTML = `${parking.parking_tmp_num}`;
      markerDiv.appendChild(boxDiv);
    }
    markerDiv.appendChild(circleDiv);
    return markerDiv;
  }

  // 信息窗体
  private renderInfoWindow(parking: ParkingDynamicsInfoEntity) {
    const infoWindowDiv = document.createElement('div');
    infoWindowDiv.className = 'info-window-container';
    const contentDiv = document.createElement('div');
    contentDiv.className = 'info-window-content';
    const titleDiv = document.createElement('h5');
    titleDiv.innerHTML = parking.parking.parking_name;
    const countDiv = document.createElement('p');
    const span1Div = document.createElement('span');
    span1Div.innerHTML = new ScreenParkingStatePipe().transform(parking.status);
    span1Div.style.color = new ScreenParkingStatePipe().transform(parking.status, true);
    const span2Div = document.createElement('span');
    const bDiv = document.createElement('b');
    bDiv.innerHTML = `${parking.parking_tmp_num}`;
    const iDiv = document.createElement('i');
    iDiv.innerHTML = `/${parking.parking_total}`;
    span2Div.appendChild(bDiv);
    span2Div.appendChild(iDiv);
    countDiv.appendChild(span1Div);
    countDiv.appendChild(span2Div);
    contentDiv.appendChild(titleDiv);
    contentDiv.appendChild(countDiv);
    infoWindowDiv.appendChild(contentDiv);
    const offset = this.isLowestZoom ? new AMap.Pixel(-3, -90) : new AMap.Pixel(-3, -60);
    this.infoWindow = new AMap.InfoWindow({
      isCustom: true,
      offset,
      anchor: 'top-left',
      content: infoWindowDiv
    });
  }

  private refreshInfoWindow(): void {
    const offset = this.isLowestZoom ? new AMap.Pixel(-3, -90) : new AMap.Pixel(-3, -60);
    this.infoWindow && this.infoWindow.setOffset(offset);
  }

}
