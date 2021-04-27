import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../core/global.service';
import {ExceptionSearchParams, ExceptionWarningEntity, ExceptionsHttpService} from './exceptions-http.service';
import {SearchAdapter, SearchAssistant} from '../../share/search-assistant';
import {ParkingsHttpService} from '../parkings/parkings-http.service';

@Component({
  selector: 'app-exceptions',
  templateUrl: './exceptions.component.html',
  styleUrls: ['./exceptions.component.css'],
  providers: [ExceptionsHttpService, ParkingsHttpService]
})
export class ExceptionsComponent implements OnInit, SearchAdapter {
  public searchParams: ExceptionSearchParams = new ExceptionSearchParams();

  public dataList: Array<ExceptionWarningEntity> = [];

  public searchAssistant: SearchAssistant;

  public selectTableItem: ExceptionWarningEntity = new ExceptionWarningEntity();

  public selectParking: ExceptionWarningEntity = new ExceptionWarningEntity();

  public isLoadComplete = false; // 数据是否加载完成

  constructor(private globalService: GlobalService, private exceptionHttpService: ExceptionsHttpService, private parkingsHttpService: ParkingsHttpService) {
  }

  public ngOnInit() {
    this.searchAssistant = new SearchAssistant(this);
    this.searchAssistant.submitSearch(true);
  }

  /* SearchAdapter 接口实现 */

  /* 请求检索 */
  public requestSearch(): any {
    this.isLoadComplete = false;
    return this.exceptionHttpService.requestWarningList(this.searchParams);
  }

  public continueSearch(url: string): any {
    return this.exceptionHttpService.continueWarningList(url);
  }

  /* 生成并检查参数有效性 */
  public generateAndCheckParamsValid(): boolean {
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
    // 获取当前页面数据
    this.dataList = results;
    this.isLoadComplete = true;
  }

  public onSelectTableItem(selectTableItem: ExceptionWarningEntity) {
    this.selectTableItem = selectTableItem;
  }

  public onStatusSelectChanged(value: string) {
    this.searchParams.status = value;
    this.searchAssistant.submitSearch(false);
  }

  public onDetailBtnClick(selectTableItem: ExceptionWarningEntity) {
    this.exceptionHttpService.requestWarningDetail(selectTableItem.abnormal_warning_id).subscribe(data => {
      this.selectParking = data;
      $('#viewContactModal').modal('show');
    }, err => {
      if (!this.globalService.httpErrorProcess(err)) {
        if (err.status === 404) {
          this.globalService.promptBox.open('该数据关联的停车场已不存在！');
        }
      }
    });
  }
}
