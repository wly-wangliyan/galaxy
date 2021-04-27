import {Component} from '@angular/core';
import {GlobalService} from '../../../core/global.service';
import {SearchAssistant, SearchAdapter} from '../../../share/search-assistant';
import {DateFormatHelper} from '../../../../utils/date-format-helper';
import {SearchUploadRecordParams, UploadRecordEntity, UploadRecordsHttpService} from './upload-records.http.service';

@Component({
  selector: 'app-upload-records',
  templateUrl: './upload-records.component.html',
  styleUrls: ['./upload-records.component.css'],
  providers: [UploadRecordsHttpService]
})
export class UploadRecordsComponent implements SearchAdapter {

  public searchParams: SearchUploadRecordParams = new SearchUploadRecordParams();

  public searchAssistant: SearchAssistant;

  public uploadRecordList: Array<UploadRecordEntity> = [];

  public selectUploadRecord: UploadRecordEntity;

  public upload_start_date: any = '';
  public upload_end_date: any = '';

  public isLoadComplete = false; // 数据是否加载完成

  constructor(private uploadRecordsHttpService: UploadRecordsHttpService, private globalService: GlobalService) {
    this.upload_start_date = DateFormatHelper.AWeekAgo;
    this.upload_end_date = DateFormatHelper.Tomorrow;
    this.searchAssistant = new SearchAssistant(this);
    this.searchAssistant.submitSearch(true);
    this.selectUploadRecord = new UploadRecordEntity();
  }

  public onSelected(uploadRecord: UploadRecordEntity) {
    this.selectUploadRecord = uploadRecord;
  }

  /* SearchDecorator 接口实现 */
  /* 请求检索 */
  public requestSearch(): any {
    this.isLoadComplete = false;
    return this.uploadRecordsHttpService.requestUploadRecordsData(this.searchParams);
  }

  public continueSearch(url: string): any {
    return this.uploadRecordsHttpService.continueUploadRecordsData(url);
  }

  /* 生成并检查参数有效性 */
  public generateAndCheckParamsValid(): boolean {
    if (this.upload_start_date && this.upload_end_date) {
      const sTimestamp = this.upload_start_date.getTime() / 1000;
      const eTimeStamp = this.upload_end_date.getTime() / 1000;
      if (sTimestamp > eTimeStamp) {
        this.globalService.promptBox.open('上传开始时间不能大于结束时间，请重新选择！');
        return false;
      }
      this.searchParams.section = sTimestamp + ',' + eTimeStamp;
    } else if (!this.upload_start_date && this.upload_end_date) {
      const eTimeStamp = this.upload_end_date.getTime() / 1000;
      this.searchParams.section = '0,' + eTimeStamp;
    } else if (this.upload_start_date && !this.upload_end_date) {
      const sTimestamp = this.upload_start_date.getTime() / 1000;
      this.searchParams.section = sTimestamp + ',' + DateFormatHelper.ForeverTimestamp;
    } else {
      this.searchParams.section = null;
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
    this.uploadRecordList = results;
    this.isLoadComplete = true;
  }
}
