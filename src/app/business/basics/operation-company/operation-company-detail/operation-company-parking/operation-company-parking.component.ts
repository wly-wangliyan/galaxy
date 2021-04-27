import {Component, OnInit} from '@angular/core';
import {OperationCompanyHttpService} from '../../operation-company-http.service';
import {SearchAssistant, SearchAdapter} from '../../../../../share/search-assistant';
import {ActivatedRoute} from '@angular/router';
import {GlobalService} from '../../../../../core/global.service';
import {DateFormatHelper} from '../../../../../../utils/date-format-helper';
import {CompanyParkingBeianEntity, ParkingBeianSearchParams} from '../../../../beian/beian.model';

@Component({
  selector: 'app-operation-company-parking',
  templateUrl: './operation-company-parking.component.html',
  styleUrls: ['./operation-company-parking.component.css']
})
export class OperationCompanyParkingComponent implements OnInit, SearchAdapter {

  public searchParams: ParkingBeianSearchParams = new ParkingBeianSearchParams();

  private company_id: string;

  public searchAssistant: SearchAssistant;

  public parkingBeianList: Array<CompanyParkingBeianEntity> = [];

  public currentSelectParking: CompanyParkingBeianEntity = new CompanyParkingBeianEntity();

  public isLoadComplete = false; // 数据是否加载完成
  
  constructor(private route: ActivatedRoute, private operationCompanyHttpService: OperationCompanyHttpService, private globalService: GlobalService) {
    this.searchAssistant = new SearchAssistant(this);
    this.searchParams.status = '1,2'; // 默认正常
    this.route.parent.params.subscribe(params => {
      this.company_id = params['company_id'];
    });
  }

  public ngOnInit() {
    this.searchAssistant.submitSearch(true);
  }

  public onSelect(item: CompanyParkingBeianEntity) {
    this.currentSelectParking = item;
  }

  public onStatusSelectChanged(value: string) {
    this.searchParams.status = value;
    this.searchAssistant.submitSearch(false);
  }

  /* SearchAdapter 接口实现 */
  /* 请求检索 */
  public requestSearch(): any {
    this.isLoadComplete = false;
    return this.operationCompanyHttpService.requestParkingBeianList(this.searchParams, this.company_id);
  }

  public continueSearch(url: string): any {
    return this.operationCompanyHttpService.continueParkingBeianList(url);
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

    this.parkingBeianList = results;
    this.isLoadComplete = true;
  }

  /* 生成状态信息 */
  public generateStatus(item: CompanyParkingBeianEntity): string {
    switch (item.status) {
      case 1:
        return '运营中';
      case 2:
        return '待运营';
      case 3:
        return '运营过期';
    }
    return '未知';
  }
}
