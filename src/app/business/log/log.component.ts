import {Component, OnInit} from '@angular/core';
import {SearchAdapter, SearchAssistant} from '../../share/search-assistant';
import {GlobalService} from '../../core/global.service';
import {ParkingsHttpService} from '../parkings/parkings-http.service';
import {LogHttpService, LogListEntity, LogListSearchParams} from './log-http.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css'],
  providers: [LogHttpService, ParkingsHttpService]
})
export class LogComponent implements OnInit, SearchAdapter {

  public searchParams: LogListSearchParams = new LogListSearchParams();

  public dataList: Array<LogListEntity> = [];

  public searchAssistant: SearchAssistant;

  public logDetail: LogListEntity = new LogListEntity();

  public editLogList = []; // 编辑员工信息权限列表

  public isLoadComplete = false; // 数据是否加载完成

  constructor(private globalService: GlobalService, private logHttpService: LogHttpService) {
  }

  public ngOnInit() {
    this.searchParams.operation_type = '';
    this.searchAssistant = new SearchAssistant(this);
    this.searchAssistant.submitSearch(true);
  }

  /* SearchAdapter 接口实现 */

  /* 请求检索 */
  public requestSearch(): any {
    this.isLoadComplete = false;
    return this.logHttpService.requestLogList(this.searchParams);
  }

  public continueSearch(url: string): any {
    return this.logHttpService.continueLogList(url);
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

  public onOperateSelectChanged(value: string) {
    this.searchParams.operation_type = value;
    this.searchAssistant.submitSearch(false);
  }

  // 点击查看 弹出模态框
  public onDetailBtnClick(logDatails: LogListEntity) {
    this.editLogList = [];
    this.logDetail = logDatails;
    for (const item in logDatails.message.new_user) {
      if (logDatails.message.new_user.hasOwnProperty(item)) {
        const permissionGroups = [];
        if (item === 'permission_groups') {
          for (let index = 0; index < 9; index++) {
            if (logDatails.message.new_user[item][index]) {
              permissionGroups.push(logDatails.message.new_user[item][index].chinese_name);
            }
          }
          this.editLogList.push(new EditLogItem(item, permissionGroups.join('、')));
        }else {
          this.editLogList.push(new EditLogItem(item, logDatails.message.new_user[item]));
        }
      }
    }
    $('#viewContactModal').modal('show');
  }
}

export class EditLogItem {
  public key: string;
  public value: string;

  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }
}
