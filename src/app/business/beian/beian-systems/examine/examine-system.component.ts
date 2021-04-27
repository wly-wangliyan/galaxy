import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {
  BeianHttpService
} from '../../beian-http.service';
import {GlobalService} from '../../../../core/global.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ZPhotoSelectComponent} from '../../../../share/components/z-photo-select/z-photo-select.component';
import {ExamineType, PlatformAuditBeianSearchParams, PlatformBeianEntity} from '../../beian.model';
import {DataCacheService} from '../../../../core/data-cache.service';

@Component({
  selector: 'app-examine-system',
  templateUrl: './examine-system.component.html',
  styleUrls: ['./examine-system.component.css', '../../beian.component.css']
})
export class ExamineSystemComponent implements OnInit {

  @ViewChild(ZPhotoSelectComponent) public ZPhotoSelectComponent: ZPhotoSelectComponent;

  public examineType: ExamineType; // 审核类型

  public platformBeianInfo: PlatformBeianEntity; // 备案管理系统信息

  public platformBeianInfoAuditParams: PlatformAuditBeianSearchParams;

  public level2AbsolutePath = '/beian/systems/';

  private platform_beian_id: string;

  public currentImageIndex = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private beianHttpService: BeianHttpService,
              private globalService: GlobalService,
              private dataCacheService: DataCacheService) {
    this.platform_beian_id = this.route.snapshot.paramMap.get('platform_beian_id');
    const examineTypeStr = this.route.snapshot.paramMap.get('examine_type');
    this.level2AbsolutePath += examineTypeStr;

    if (examineTypeStr === 'check-pending') {
      this.examineType = ExamineType.checkPending;
    } else if (examineTypeStr === 'checked') {
      this.examineType = ExamineType.checked;
    } else {
      this.examineType = ExamineType.notPass;
    }
  }

  public ngOnInit() {
    this.requestPlatformBeianExamineDetail();
  }

  /**
   * 提交审核结果
   */
  public onAddPlatformBeianExamineFormSubmit() {

    this.beianHttpService.requestPlatformAuditBeian(this.platformBeianInfoAuditParams, this.platform_beian_id).subscribe(() => {
      $('#platformBeianExamineModal').modal('hide');
      this.globalService.promptBox.open('审核成功！', () => {
        this.dataCacheService.clear();
        this.router.navigate(['../../../../systems'], {relativeTo: this.route});
      });
    }, err => {
      this.globalService.httpErrorProcess(err);
    });
  }

  /**
   * 打开审核停车场模态框
   */
  public openExamineSystemModal() {
    this.platformBeianInfoAuditParams = new PlatformAuditBeianSearchParams();
    Observable.timer(0).subscribe(() => {
      $('#platformBeianExamineModal').modal();
    });
  }

  /**
   * 选择审核结果
   * @param {Event} event Event
   */
  public selectExamineResult(event: Event) {
    this.platformBeianInfoAuditParams.status = Number((event.target as HTMLInputElement).value);
  }

  /**
   * 获取组件点击后的图片显示顺序
   * @param event
   */
  public onPictureIndexChange(event: any) {
    this.currentImageIndex = event.currentPictureIndex - 1;
  }

  /**
   * 打开放大图片模态框
   */
  public openZoomPictureModal() {
    this.ZPhotoSelectComponent.zoomPicture(this.currentImageIndex);
  }

  /**
   * 切换图片
   * @param {number} step
   */
  public showNextImage(step: number) {
    if (this.currentImageIndex === 0 && step === -1) {
      return;
    }
    if (this.currentImageIndex === this.platformBeianInfo.authority_images.length - 1 && step === 1) {
      return;
    }
    this.currentImageIndex += step;
  }

  /**
   * 请求管理系统备案审核详情
   */
  private requestPlatformBeianExamineDetail() {
    this.beianHttpService.requestPlatformAuditBeianDetail(this.platform_beian_id).subscribe(platformBeianInfo => {
      this.platformBeianInfo = platformBeianInfo;
    }, err => {
      this.globalService.httpErrorProcess(err);
    });
  }
}
