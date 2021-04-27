import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {
  ParkingsHttpService
} from '../../../../business/parkings/parkings-http.service';
import {Subscription} from 'rxjs/Subscription';
import {GlobalService} from '../../../../core/global.service';
import {ProCityDistSelectComponent} from '../../pro-city-dist-select/pro-city-dist-select.component';
import {MapItem, MapType, ZMapSelectPointComponent} from '../../z-map-select-point/z-map-select-point.component';
import {ParkingEntity} from '../../../../business/parkings/parkings.model';

@Component({
  selector: 'app-parking-modal',
  templateUrl: './parking-modal.component.html',
  styleUrls: ['./parking-modal.component.css', '../common-css-detail-modal.css'],
  providers: [ParkingsHttpService]
})
export class ParkingModalComponent implements OnDestroy {

  @ViewChild('viewDetailModal') public viewDetailModal: ElementRef;
  @ViewChild(ProCityDistSelectComponent) public proCityDistSelectComponent: ProCityDistSelectComponent;
  @ViewChild(ZMapSelectPointComponent) public zMapSelectPointComponent: ZMapSelectPointComponent;
  private cancelSubscription: Subscription;

  public parking: ParkingEntity = new ParkingEntity();
  /*查看位置*/
  public mapObj: MapItem = {
    point: [],
    type: MapType.view,
    address: '',
    hasDetailedAddress: false,
    cityCode: ''
  };

  private isLoading = false;

  constructor(private parkingHttpService: ParkingsHttpService, private globalService: GlobalService) {
  }

  public ngOnDestroy() {
    this.cancelSubscription && this.cancelSubscription.unsubscribe();
  }

  /**
   * 查看详情
   * @param {string} parking_id 停车场id
   */
  public showDetail(parking_id: string) {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;

    this.cancelSubscription && this.cancelSubscription.unsubscribe();
    this.cancelSubscription = this.parkingHttpService.requestParkingsByIdData(parking_id).subscribe(entity => {
      this.parking = entity;
      $(this.viewDetailModal.nativeElement).modal('show');
      this.isLoading = false;
    }, err => {
      this.globalService.httpErrorProcess(err);
      this.isLoading = false;
    });
  }

  // 打开地图组件
  public openMapModal() {
    this.parking.address = this.parking.address ? this.parking.address : '';
    if (this.parking.address) {
      this.mapObj.hasDetailedAddress = true;
    }
    if (this.parking.lon && this.parking.lat) {
      this.mapObj.point = [];
      this.mapObj.point.push(Number(this.parking.lon));
      this.mapObj.point.push(Number(this.parking.lat));
    }
    this.zMapSelectPointComponent.openMap();
  }

  /* 生成状态信息 */
  public generateStatus(item: ParkingEntity): string {
    switch (Number(item.status)) {
      case 1:
        return '运营中';
      case 2:
        return '未运营';
      case 3:
        return '待运营';
    }
    return '未知';
  }
}
