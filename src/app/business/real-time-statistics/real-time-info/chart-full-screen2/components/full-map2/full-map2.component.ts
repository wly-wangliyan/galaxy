import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {DataStatisticsHttpService} from '../../../../../data-statistics/data-statistics-http.service';
import {GlobalConst} from '../../../../../../share/global-const';
import {ChartFullScreenService} from '../../../chart-full-screen/chart-full-screen.service';
import {Subscription} from 'rxjs/Subscription';
import {ParkingDynamicsInfoEntity} from '../../../../../data-statistics/data-statistics.model';
import {MapMonitorVideoComponent} from '../../../components/map-monitor-video/map-monitor-video.component';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-full-map2',
  templateUrl: './full-map2.component.html',
  styleUrls: ['./full-map2.component.css']
})
export class FullMap2Component implements OnInit, OnDestroy {

  @Input() public sourceWidth: string;
  @Input() public sourceHeight: string;

  @Input() // 区分1：路内或2：路外
  public set areaType(area_type: number) {
    this._areaType = area_type;
  }

  private _areaType: number;
  public get areaType(): number {
    return this._areaType;
  }

  @Output() public parkingListComplete: EventEmitter<Array<ParkingDynamicsInfoEntity>> = new EventEmitter();

  public isTrafficOn = true; // 路况开关
  public trafficLayer: any;

  private map: any;
  private mapCompleteEventListener: any;

  private parkingList: Array<ParkingDynamicsInfoEntity> = [];
  private markerList: Array<any>;

  private searchSubscription: Subscription;
  private timerSubscription: Subscription;
  private idSubscription: Subscription;
  private videoReadySubscription: Subscription;
  private dataSubscription: Subscription;
  private keyBoardSubscription: Subscription;

  private selectMapContentInfoWindow: any; // 地图图层的停车场
  private isFirstRequest = true; // 第一次请求
  private selectedMarkerIndex: number; // 选中的泡泡
  public isSimplePermission: Boolean = false; // 是否为简易权限

  @ViewChild(MapMonitorVideoComponent) private mapMonitorVideoCpt: MapMonitorVideoComponent;

  constructor(private dataStatisticsHttpService: DataStatisticsHttpService, private fullScreenService: ChartFullScreenService) {
  }

  public ngOnInit() {
    this.timerSubscription = this.fullScreenService.timer_1minutes.subscribe(() => {
      this.requestAllData();
    });
    this.initMap();
    this.initShortCutKey();
  }

  public ngOnDestroy() {
    this.mapCompleteEventListener && AMap && AMap.event.removeListener(this.mapCompleteEventListener);
    this.searchSubscription && this.searchSubscription.unsubscribe();
    this.timerSubscription && this.timerSubscription.unsubscribe();
    this.videoReadySubscription && this.videoReadySubscription.unsubscribe();
    this.mapMonitorVideoCpt && this.mapMonitorVideoCpt.close();
    this.keyBoardSubscription && this.keyBoardSubscription.unsubscribe();
  }

  /**
   * 初始化地图及组件
   */
  private initMap() {
    // 初始化地图
    this.map = new AMap.Map('map-container', {
      resizeEnable: true,
      center: GlobalConst.RegionCenter,
      zoom: 11,
      zooms: [11, 18],
      mapStyle: 'amap://styles/blue',
      dragEnable: true,
      keyboardEnable: false
    });
    // 实时路况图层
    this.trafficLayer = new AMap.TileLayer.Traffic({
      zIndex: 10
    });
    this.trafficLayer.setMap(this.map);
    // 地图图块加载完成后触发事件
    this.mapCompleteEventListener = AMap.event.addListener(this.map, 'complete', () => {
      this.requestAllData();
      this.map.on('click', () => {
        this.map.clearInfoWindow();
        this.refreshMarkerStatus();
      });
    });
  }

  /* 路况开关事件 */
  public onTrafficBtnClick() {
    this.isTrafficOn = !this.isTrafficOn;
    if (this.isTrafficOn) {
      this.trafficLayer && this.trafficLayer.show();
    } else {
      this.trafficLayer && this.trafficLayer.hide();
    }
  }

  /**** 地图数据处理 ****/

  /* 请求所有数据 */
  private requestAllData() {
    this.dataSubscription && this.dataSubscription.unsubscribe();
    this.dataSubscription = this.dataStatisticsHttpService.requestAllParkingDynamicInfoList(GlobalConst.RegionID).subscribe(results => {
      const parkingList = [];
      results[0].forEach(parkItem => {
        // #54699 地图里不显示已中断停车场泡泡
        if (parkItem.status > 0 && parkItem.run_status !== 2) {
          parkingList.push(parkItem);
          if (parkItem.tmp_num == '*' || parkItem.parking_tmp_num == '*') {
            this.isSimplePermission = true;
          }
        }
      });

      this.parkingList = parkingList;
      this.parkingListComplete.emit(parkingList);
      this.updateParkingData();
    });
  }

  /* 更新停车场相关数据 */
  private updateParkingData() {
    // 更新停车场数据,并同步一次显示状态
    const tempMarkerList = [];
    this.parkingList.forEach((item, index) => {

      if (this.isFirstRequest) {
        const marker = this.generateMarker(item);
        // 关联气泡的点击事件,移入移出事件
        this.onMarkerClickHandle(marker);
        tempMarkerList.push(marker);
        this.map && this.markerList && this.map.remove(this.markerList);
        this.map && this.map.add(tempMarkerList);
        this.markerList = tempMarkerList;
      } else {
        // 记住放大的状态
        if (this.selectedMarkerIndex) {
          this.refreshMarkerActive(this.markerList[this.selectedMarkerIndex], true);
          this.selectMapContentInfoWindow && this.selectMapContentInfoWindow.close();
          const info = this.markerList[this.selectedMarkerIndex].getExtData();
          const position = new AMap.LngLat(Number(info.parking.lon), Number(info.parking.lat));
          this.selectMapContentInfoWindow = this.generateContentInfoWindow(item);
          this.selectMapContentInfoWindow.open(this.map, position);
        }
      }
    });
    this.isFirstRequest = false;
  }

  /**
   * 放大/缩小泡泡
   * @param {boolean} isActive true 放大 false:缩小
   */
  private refreshMarkerActive(marker: any, isActive: boolean) {
    if (isActive) {
      marker.setContent(this.generateMarkerContent(marker.getExtData(), true));
      marker.setOffset(new AMap.Pixel(-20, -54));
      marker.setzIndex(102);
    } else {
      marker.setContent(this.generateMarkerContent(marker.getExtData()));
      marker.setOffset(new AMap.Pixel(-13, -35));
      marker.setzIndex(101);
    }
  }

  /**
   * 生成点标记
   * @param {ParkingDynamicsInfoEntity} parkingInfo
   * @param {boolean} isActive true 放大 false 缩小
   */
  private generateMarker(parkingInfo: ParkingDynamicsInfoEntity, isActive: boolean = false) {

    const marker = new AMap.Marker({
      position: new AMap.LngLat(Number(parkingInfo.parking.lon), Number(parkingInfo.parking.lat)),
      extData: parkingInfo,
      title: parkingInfo.parking.parking_name,
      offset: new AMap.Pixel(-13, -35),
      content: this.generateMarkerContent(parkingInfo, isActive),
      zIndex: 101,
    });
    if (!isActive) {
      marker.setOffset(new AMap.Pixel(-13, -35));
      marker.setzIndex(101);
      return marker;
    } else {
      marker.setOffset(new AMap.Pixel(-20, -54));
      marker.setzIndex(102);
      return marker;
    }
  }

  /**
   * 生成点标记content
   * @param {ParkingDynamicsInfoEntity} parkingInfo
   * @param {boolean} isActive
   * @returns {string}
   */
  private generateMarkerContent(parkingInfo: ParkingDynamicsInfoEntity, isActive: boolean = false) {

    let count: any;
    if (this.isSimplePermission) {
      count = 'P';
    } else {
      count = parkingInfo.parking_total - parkingInfo.parking_tmp_num;
      if (count >= 999) {
        count = '999';
      } else if (count < 1) {
        count = '满';
      }
    }
    const markderClassObj = {
      0: 'ther-amap-icon-unknown',
      1: 'ther-amap-icon-free',
      2: 'ther-amap-icon-loose',
      3: 'ther-amap-icon-nervous'
    };
    const markerActiveClassObj = {
      0: 'ther-amap-icon-unknown-active',
      1: 'ther-amap-icon-free-active',
      2: 'ther-amap-icon-loose-active',
      3: 'ther-amap-icon-nervous-active'
    };
    const count_content = parkingInfo.parking_status > 0 ? `<i>${count}</i>` : '';
    const marker_top = parkingInfo.parking.charging_pile ? '<b></b>' : '';
    // 是否为路内停车场
    const isInsideIcon = parkingInfo.parking.area_type && parkingInfo.parking.area_type === 1 ? 'inside-icon' : '';
    if (!isActive) {
      const content = `<div class="ther-amap-icon ${isInsideIcon} ${markderClassObj[parkingInfo.parking_status]}">${marker_top + count_content}</div>`;
      return content;
    } else {
      const content = `<div class="ther-amap-icon ther-amap-icon-active ${isInsideIcon} ${markerActiveClassObj[parkingInfo.parking_status]}">${marker_top + count_content}</div>`;
      return content;
    }
  }

  /* 更新点标记状态（变小） */
  private refreshMarkerStatus() {
    if (this.markerList) {
      this.markerList.forEach(markerItem => {
        this.refreshMarkerActive(markerItem, false);
      });
    }
  }

  /**
   * 点标记的点击事件
   * @param marker
   * @param {boolean} isSelectMarker 是否是selectMarker
   */
  private onMarkerClickHandle(marker: any) {
    marker.on('click', (event: any) => {

      // 高亮点击的marker
      this.refreshMarkerStatus();
      this.refreshMarkerActive(marker, true);

      const info = event.target.getExtData();
      const position = new AMap.LngLat(Number(info.parking.lon), Number(info.parking.lat));
      this.map.clearInfoWindow();
      this.map.setCenter(position);
      this.selectMapContentInfoWindow = this.generateContentInfoWindow(info);
      this.selectMapContentInfoWindow.open(this.map, position);
    });
  }

  /**
   * 生成信息窗体
   * @param parkingInfo 数据详情
   * @returns {AMap.InfoWindow}
   */
  private generateContentInfoWindow(parkingInfo: ParkingDynamicsInfoEntity): any {

    this.idSubscription && this.idSubscription.unsubscribe();

    const info = document.createElement('div');
    info.className = 'amap-content-window fs-amap-content-window';

    // 定义信息
    const row2 = document.createElement('div');
    row2.className = 'amap-content-window-row fs-amap-content-window-row';
    const row2Column1 = document.createElement('div');
    row2Column1.innerHTML = parkingInfo.parking.parking_name;
    row2.appendChild(row2Column1);
    info.appendChild(row2);

    const row1 = document.createElement('div');
    row1.className = 'amap-content-window-row fs-amap-content-window-row';
    const row1Column1 = document.createElement('div');
    row1Column1.style.color = this.formatDataColor(parkingInfo.parking_status);
    row1Column1.innerHTML = this.formatDataStatus(parkingInfo.parking_status);
    const row1Column2 = document.createElement('div');
    const row1Column1Span1 = document.createElement('span');
    row1Column1Span1.innerHTML = parkingInfo.parking_status === 0 ? '--/' : parkingInfo.parking_tmp_num.toString();
    if (parkingInfo.parking_status > 0) {
      row1Column1Span1.style.color = this.formatDataColor(parkingInfo.parking_status);
    }
    const row1Column1Span2 = document.createElement('span');
    row1Column1Span2.innerHTML = parkingInfo.parking_status === 0 ? '--' : '/' + parkingInfo.parking_total;
    if (!this.isSimplePermission) {
      row1Column2.appendChild(row1Column1Span1);
      row1Column2.appendChild(row1Column1Span2);
    }
    row1.appendChild(row1Column1);
    row1.appendChild(row1Column2);
    info.appendChild(row1);

    const infoWindow = new AMap.InfoWindow({
      isCustom: true,  // 使用自定义窗体
      content: info,
      offset: new AMap.Pixel(120, -0)
    });
    return infoWindow;
  }

  /**
   * 泊位状态对应的颜色
   * @param status
   */
  private formatDataColor(status: number): string {
    switch (status) {
      case 0:
        return '#a786ce';
      case 1:
        return '#56c74e';
      case 2:
        return '#e87724';
      case 3:
        return '#f45c63';
    }
  }

  /**
   * 泊位状态
   * @param status 状态码
   * @returns {any}
   */
  private formatDataStatus(status: number): string {
    switch (status) {
      case 0:
        return '中断';
      case 1:
        return '充足';
      case 2:
        return '适中';
      case 3:
        return '紧张';
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
}
