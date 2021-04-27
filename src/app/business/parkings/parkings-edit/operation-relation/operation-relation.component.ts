import {OnInit, AfterViewInit, Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalService} from '../../../../core/global.service';
import {DataCacheService} from '../../../../core/data-cache.service';
import {ParkingsHttpService} from '../../parkings-http.service';
import {ParkingRelationEntity} from '../../parkings.model';

@Component({
  selector: 'app-operation-relation',
  templateUrl: './operation-relation.component.html',
  styleUrls: ['../../parkings.component.css', '../parkings-edit.component.css']
})

export class EditOperationRelationComponent implements OnInit, AfterViewInit {

  public parking_id: string;

  public company_start_time: any = '';

  public manufacturer_start_time: any = '';

  public parkingRelationInfo: ParkingRelationEntity = new ParkingRelationEntity();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private parkingsHttpService: ParkingsHttpService,
              private globalService: GlobalService,
              private dataCacheService: DataCacheService) {
    this.route.parent.params.subscribe(params => {
      this.parking_id = params['parking_id'];
    });
  }

  public ngOnInit() {
    this.parkingsHttpService.requestParkingRelationDetail(this.parking_id).subscribe(result => {
      this.parkingRelationInfo = result;
      if (this.parkingRelationInfo.company) {
        this.company_start_time = new Date(this.parkingRelationInfo.company.created_time * 1000);
      }
      if (this.parkingRelationInfo.platform && this.parkingRelationInfo.platform.manufacturer) {
        this.manufacturer_start_time = new Date(this.parkingRelationInfo.platform.manufacturer.created_time * 1000);
      }
    }, err => {
      if (!this.globalService.httpErrorProcess(err)) {
        if (err.status === 404) {
          this.globalService.promptBox.open('请求地址错误！');
        }
      }
    });
  }

  public onCancelOperationBtnClick() {
    this.globalService.confirmationBox.open('是否确定解除运营关系，此操作不可恢复！', () => {
      this.globalService.confirmationBox.close();
      this.parkingsHttpService.requestCancelRelation(this.parking_id).subscribe(() => {
        this.globalService.promptBox.open('运营关系已解除', () => {
          this.dataCacheService.clear();
          this.router.navigate(['../../'], {relativeTo: this.route});
        });
      }, err => {
        this.globalService.httpErrorProcess(err);
      });
    });
  }

  // 时间组件加载完成后修改样式
  public ngAfterViewInit() {
    // 定制宽度效果
    $('.date-time-group').css('width', '100%');
    $('.date-time').css('width', '50%');
  }
}
