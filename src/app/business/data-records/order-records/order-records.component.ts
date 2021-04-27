import {Component} from '@angular/core';
import {GlobalService} from '../../../core/global.service';
import {SearchAssistant, SearchAdapter} from '../../../share/search-assistant';
import {DefaultUserType} from '../../../share/pipes/user-type.pipe';
import {DefaultPaidType} from '../../../share/pipes/paid-type.pipe';
import {DateFormatHelper} from '../../../../utils/date-format-helper';
import {OrderRecordsHttpService, ParkingFeeEntity, SearchOrderRecordParams} from './order-records-http.service';

@Component({
  selector: 'app-order-records',
  templateUrl: './order-records.component.html',
  styleUrls: ['./order-records.component.css'],
  providers: [OrderRecordsHttpService]
})
export class OrderRecordsComponent implements SearchAdapter {

  public searchParams: SearchOrderRecordParams = new SearchOrderRecordParams();

  public searchAssistant: SearchAssistant;

  public orderRecordList: Array<ParkingFeeEntity> = [];

  public selectOrderRecord: ParkingFeeEntity;

  public defaultUserType = DefaultUserType;

  public defaultPaidType = DefaultPaidType;

  public entrance_start_date: any = '';
  public entrance_end_date: any = '';

  public paid_start_date: any = '';
  public paid_end_date: any = '';

  public isLoadComplete = false; // 数据是否加载完成

  constructor(private orderRecordsHttpService: OrderRecordsHttpService, private globalService: GlobalService) {
    this.searchAssistant = new SearchAssistant(this);
    this.searchAssistant.submitSearch(true);
    this.selectOrderRecord = new ParkingFeeEntity();
  }

  public onSelected(orderRecord: ParkingFeeEntity) {
    this.selectOrderRecord = orderRecord;
  }

  /* SearchDecorator 接口实现 */
  /* 请求检索 */
  public requestSearch(): any {
    this.isLoadComplete = false;
    return this.orderRecordsHttpService.requestOrderRecordsData(this.searchParams);
  }

  public continueSearch(url: string): any {
    return this.orderRecordsHttpService.continueOrderRecordsData(url);
  }

  /* 生成并检查参数有效性 */
  public generateAndCheckParamsValid(): boolean {
    if (this.entrance_start_date && this.entrance_end_date) {
      const sTimestamp = this.entrance_start_date.getTime() / 1000;
      const eTimeStamp = this.entrance_end_date.getTime() / 1000;
      if (sTimestamp > eTimeStamp) {
        this.globalService.promptBox.open('入场开始时间不能大于结束时间，请重新选择！');
        return false;
      }
      this.searchParams.entry_section = sTimestamp + ',' + eTimeStamp;
    } else if (!this.entrance_start_date && this.entrance_end_date) {
      const eTimeStamp = this.entrance_end_date.getTime() / 1000;
      this.searchParams.entry_section = '0,' + eTimeStamp;
    } else if (this.entrance_start_date && !this.entrance_end_date) {
      const sTimestamp = this.entrance_start_date.getTime() / 1000;
      this.searchParams.entry_section = sTimestamp + ',' + DateFormatHelper.ForeverTimestamp;
    } else {
      this.searchParams.entry_section = null;
    }

    if (this.paid_start_date && this.paid_end_date) {
      const sTimestamp = this.paid_start_date.getTime() / 1000;
      const eTimeStamp = this.paid_end_date.getTime() / 1000;
      if (sTimestamp > eTimeStamp) {
        this.globalService.promptBox.open('收费开始时间不能大于结束时间，请重新选择！');
        return false;
      }
      this.searchParams.paid_section = sTimestamp + ',' + eTimeStamp;
    } else if (!this.paid_start_date && this.paid_end_date) {
      const eTimeStamp = this.paid_end_date.getTime() / 1000;
      this.searchParams.paid_section = '0,' + eTimeStamp;
    } else if (this.paid_start_date && !this.paid_end_date) {
      const sTimestamp = this.paid_start_date.getTime() / 1000;
      this.searchParams.paid_section = sTimestamp + ',' + DateFormatHelper.ForeverTimestamp;
    } else {
      this.searchParams.paid_section = null;
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

    this.orderRecordList = results;
    this.isLoadComplete = true;
  }
}
