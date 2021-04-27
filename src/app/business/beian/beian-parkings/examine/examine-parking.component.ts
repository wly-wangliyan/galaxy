import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {BeianHttpService} from '../../beian-http.service';
import {GlobalService} from '../../../../core/global.service';
import {ExamineType, ParkingBeianEntity, ParkingBeianInfoAuditSearchParams} from '../../beian.model';
import {
  MapItem, MapType,
  ZMapSelectPointComponent
} from '../../../../share/components/z-map-select-point/z-map-select-point.component';
import {ZPhotoSelectComponent} from '../../../../share/components/z-photo-select/z-photo-select.component';
import {DataCacheService} from '../../../../core/data-cache.service';

@Component({
  selector: 'app-examine-parking',
  templateUrl: './examine-parking.component.html',
  styleUrls: ['./examine-parking.component.css', '../../beian.component.css']
})
export class ExamineParkingComponent implements OnInit {

  @ViewChild(ZMapSelectPointComponent) public zMapSelectPointComponent: ZMapSelectPointComponent;
  @ViewChild(ZPhotoSelectComponent) public ZPhotoSelectComponent: ZPhotoSelectComponent;

  public examineType: ExamineType; // 审核类型

  public parkingBeianInfo: ParkingBeianEntity; // 备案停车场信息

  public parkingBeianInfoAuditParams: ParkingBeianInfoAuditSearchParams;

  public level2AbsolutePath = '/beian/parkings/';

  public mapItem: MapItem;

  private parking_beian_id: string;

  public currentImageIndex = 0; // 图片index;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private beianHttpService: BeianHttpService,
              private globalService: GlobalService,
              private dataCacheService: DataCacheService) {
    this.parking_beian_id = this.route.snapshot.paramMap.get('parking_beian_id');
    const examineTypeStr = this.route.snapshot.paramMap.get('examine_type');
    this.level2AbsolutePath += examineTypeStr;

    this.mapItem = new MapItem(MapType.view, []);

    if (examineTypeStr === 'check-pending') {
      this.examineType = ExamineType.checkPending;
    } else if (examineTypeStr === 'checked') {
      this.examineType = ExamineType.checked;
    } else {
      this.examineType = ExamineType.notPass;
    }
  }

  public ngOnInit() {
    this.requestParkingBeianExamineDetail();
  }

  /**
   * 提交审核结果
   */
  public onAddParkingBeianExamineFormSubmit() {

    this.beianHttpService.requestParkingBeianInfoAudit(this.parkingBeianInfoAuditParams, this.parking_beian_id).subscribe(() => {
      $('#parkingBeianExamineModal').modal('hide');
      this.globalService.promptBox.open('审核成功！', () => {
        this.dataCacheService.clear();
        this.router.navigate(['../../../../parkings'], {relativeTo: this.route});
      });
    }, err => {
      this.globalService.httpErrorProcess(err);
    });
  }

  /**
   * 打开审核停车场模态框
   */
  public openExamineParkingModal() {
    this.parkingBeianInfoAuditParams = new ParkingBeianInfoAuditSearchParams();
    Observable.timer(0).subscribe(() => {
      $('#parkingBeianExamineModal').modal();
    });
  }

  /**
   * 选择审核结果
   * @param {Event} event Event
   */
  public selectExamineResult(event: Event) {
    this.parkingBeianInfoAuditParams.status = Number((event.target as HTMLInputElement).value);
  }

  /**
   * 切换图片
   * @param {number} step +1 or -1
   */
  public showNextImage(step: number) {
    if (this.currentImageIndex === 0 && step === -1) {
      return;
    }
    if (this.currentImageIndex === this.parkingBeianInfo.images.length - 1 && step === 1) {
      return;
    }
    this.currentImageIndex += step;
  }

  /**
   * 打开地图组件
   */
  public openMapModal() {
    if (this.parkingBeianInfo.address) {
      this.mapItem.hasDetailedAddress = true;
    }
    if (this.parkingBeianInfo.lon && this.parkingBeianInfo.lat) {
      this.mapItem.point.push(Number(this.parkingBeianInfo.lon));
      this.mapItem.point.push(Number(this.parkingBeianInfo.lat));
    }
    this.mapItem.address = this.parkingBeianInfo.address;
    this.zMapSelectPointComponent.openMap();
  }

  /**
   * 获取组件点击后的图片显示顺序
   * @param event
   */
  public onPictureIndexChange(event: any) {
    this.currentImageIndex = event.currentPictureIndex - 1;
  }

  /**
   * 打开放大图片组件
   */
  public openZoomPictureModal() {
    this.ZPhotoSelectComponent.zoomPicture(this.currentImageIndex);
  }

  /**
   * 请求停车场备案审核详情
   */
  private requestParkingBeianExamineDetail() {
    this.beianHttpService.requestParkingBeianInfoDetail(this.parking_beian_id).subscribe(parkingBeianInfo => {
      this.parkingBeianInfo = parkingBeianInfo;
    }, err => {
      this.globalService.httpErrorProcess(err);
    });
  }

}
