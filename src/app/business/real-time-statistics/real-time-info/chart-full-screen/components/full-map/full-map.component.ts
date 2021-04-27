import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {GlobalConst} from '../../../../../../share/global-const';
import {DataStatisticsHttpService} from '../../../../../data-statistics/data-statistics-http.service';
import {ParkingDynamicsInfoEntity} from '../../../../../data-statistics/data-statistics.model';
import {ChartFullScreenService} from '../../chart-full-screen.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-full-map',
  templateUrl: './full-map.component.html',
  styleUrls: ['./full-map.component.css']
})
export class FullMapComponent implements OnInit, OnDestroy {

  @Input() public sourceWidth: string;
  @Input() public sourceHeight: string;
  private map: any;
  private mapCompleteEventListener: any;

  private parkingList: Array<ParkingDynamicsInfoEntity> = [];
  private markerList: Array<any>;

  private searchSubscription: Subscription;
  private timerSubscription: Subscription;
  private idSubscription: Subscription;
  private dataSubscription: Subscription;

  private selectMapContentInfoWindow: any; // 地图图层的停车场
  private isFirstRequest = true; // 第一次请求
  private selectedMarkerIndex: number; // 选中的泡泡
  public isSimplePermission: Boolean = false; // 是否为简易权限

  constructor(private dataStatisticsHttpService: DataStatisticsHttpService, private fullScreenService: ChartFullScreenService) {
  }

  public ngOnInit() {
    this.timerSubscription = this.fullScreenService.timer_1minutes.subscribe(() => {
      this.requestAllData();
    });
    this.initMap();
  }

  public ngOnDestroy() {
    this.mapCompleteEventListener && AMap && AMap.event.removeListener(this.mapCompleteEventListener);
    this.searchSubscription && this.searchSubscription.unsubscribe();
    this.timerSubscription && this.timerSubscription.unsubscribe();
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
    // 地图图块加载完成后触发事件
    this.mapCompleteEventListener = AMap.event.addListener(this.map, 'complete', () => {
      this.requestAllData();
      this.map.on('click', () => {
        this.map.clearInfoWindow();
        this.refreshMarkerStatus();
      });
    });
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
          if (parkItem.tmp_num == '*') {
            this.isSimplePermission = true;
          }
        }
      });
      this.parkingList = parkingList;
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
      count = parkingInfo.total_tmp_num - parkingInfo.tmp_num;
      if (count > 99) {
        count = '99+';
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
    const count_content = parkingInfo.status > 0 ? `<i>${count}</i>` : '';
    const marker_top = parkingInfo.parking.charging_pile ? '<b></b>' : '';
    if (!isActive) {
      const content = `<div class="ther-amap-icon ${markderClassObj[parkingInfo.status]}">${marker_top + count_content}</div>`;
      return content;
    } else {
      const content = `<div class="ther-amap-icon ther-amap-icon-active ${markerActiveClassObj[parkingInfo.status]}">${marker_top + count_content}</div>`;
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
    row1Column1.style.color = this.formatDataColor(parkingInfo.status);
    row1Column1.innerHTML = this.formatDataStatus(parkingInfo.status);
    const row1Column2 = document.createElement('div');
    const row1Column1Span1 = document.createElement('span');
    row1Column1Span1.innerHTML = parkingInfo.status === 0 ? '--/' : parkingInfo.tmp_num.toString();
    if (parkingInfo.status > 0) {
      row1Column1Span1.style.color = this.formatDataColor(parkingInfo.status);
    }
    const row1Column1Span2 = document.createElement('span');
    row1Column1Span2.innerHTML = parkingInfo.status === 0 ? '--' : '/' + parkingInfo.total_tmp_num;
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
   * 车位状态对应的颜色
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
   * 车位状态
   * @param status 状态码
   * @returns {any}
   */
  private formatDataStatus(status: number): string {
    switch (status) {
      case 0:
        return '中断';
      case 1:
        return '空闲';
      case 2:
        return '宽松';
      case 3:
        return '紧张';
    }
  }
}
