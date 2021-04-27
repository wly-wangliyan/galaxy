import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SearchAdapter, SearchAssistant} from '../../../share/search-assistant';
import {GlobalService} from '../../../core/global.service';
import {
  ParkingsHttpService
} from '../parkings-http.service';
import {DateFormatHelper} from '../../../../utils/date-format-helper';
import {GlobalConst} from '../../../share/global-const';
import {ParkingUpdateRecordEntity, ParkingUpdateRecordSearchParams} from '../parkings.model';

@Component({
  selector: 'app-parking-update-record',
  templateUrl: './parking-update-record.component.html',
  styleUrls: ['./parking-update-record.component.css']
})
export class ParkingUpdateRecordComponent implements SearchAdapter {

  public searchParams: ParkingUpdateRecordSearchParams = new ParkingUpdateRecordSearchParams();

  public searchAssistant: SearchAssistant;

  public updateRecordsList: Array<ParkingUpdateRecordEntity> = [];

  public currentSelectUpdateRecords: ParkingUpdateRecordEntity;

  public selectedUpdateRecordDetail: any;

  public updateTypeList: Array<number> = [1, 3, 4];

  public operateTypeList: Array<string> = ['add', 'update', 'cancel'];

  public parking_id: string;

  public update_start_time: any = '';

  public update_end_time: any = '';

  public isLoadComplete = false; // 数据是否加载完成

  constructor(private route: ActivatedRoute, private parkingsHttpService: ParkingsHttpService, private globalService: GlobalService) {
    this.route.params.subscribe(params => {
      this.parking_id = params['parking_id'];
    });
    this.update_start_time = DateFormatHelper.AWeekAgo;
    this.update_end_time = DateFormatHelper.Tomorrow;
    this.searchParams.page_size = GlobalConst.PageSize;
    this.searchParams.update_type = 0;
    this.searchParams.operate_type = '';
    this.searchAssistant = new SearchAssistant(this);
    this.searchAssistant.submitSearch(true);
    this.currentSelectUpdateRecords = new ParkingUpdateRecordEntity();
  }

  public onSelect(updateRecords: ParkingUpdateRecordEntity) {
    this.currentSelectUpdateRecords = updateRecords;
  }

  // 查看详情
  public onDetailBtnClick(selectedItem: ParkingUpdateRecordEntity, operatorType: string) {
    this.selectedUpdateRecordDetail = selectedItem;
    setTimeout(() => {
      $('#viewDetailModal').modal('show');
    }, 0);
  }

  /* SearchAdapter 接口实现 */
  /* 请求检索 */
  public requestSearch(): any {
    this.isLoadComplete = false;
    return this.parkingsHttpService.requestParkingUpdateRecordData(this.searchParams, this.parking_id);
  }

  public continueSearch(url: string): any {
    return this.parkingsHttpService.continueParkingUpdateRecord(url);
  }

  /* 生成并检查参数有效性 */
  public generateAndCheckParamsValid(): boolean {
    if (this.update_start_time && this.update_end_time) {
      const sTimestamp = this.update_start_time.getTime() / 1000;
      const eTimeStamp = this.update_end_time.getTime() / 1000;
      if (sTimestamp > eTimeStamp) {
        this.globalService.promptBox.open('上传开始时间不能大于结束时间，请重新选择！');
        return false;
      }
      this.searchParams.update_start_time = sTimestamp.toString();
      this.searchParams.update_end_time = eTimeStamp.toString();
    } else if (!this.update_start_time && this.update_end_time) {
      const eTimeStamp = this.update_end_time.getTime() / 1000;
      this.searchParams.update_end_time = eTimeStamp.toString();
    } else if (this.update_start_time && !this.update_end_time) {
      const sTimestamp = this.update_start_time.getTime() / 1000;
      this.searchParams.update_start_time = sTimestamp.toString();
    } else {
      this.searchParams.update_start_time = this.searchParams.update_end_time = '';
    }
    return true;
  }

  /* 检索失败处理 */
  public searchErrProcess(err: any) {
    this.globalService.httpErrorProcess(err);
  }

  /* 检索成功处理 */
  public searchCompleteProcess(results: Array<any>, isFuzzySearch: boolean) {
    if (results.length === 0 && !isFuzzySearch) {
      // 精确查询时需要弹出提示
      this.globalService.promptBox.open('暂未查询到数据！');
    }

    this.updateRecordsList = results;
    this.isLoadComplete = true;
  }

  public convertBeianStatus(beian_status: any): string {
    switch (Number(beian_status)) {
      case 1:
        return '正常';
      case 2:
        return '未备案';
      case 3:
        return '已到期';
      default:
        return '--';
    }
  }
}
