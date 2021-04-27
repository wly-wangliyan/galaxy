import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
  ParkingDynamicsInfoParams, ParkingDynamicsInfoEntity,
  RegionRealTimeDataEntity, ParkingDynamicsCompleteInfoParams, ParkingDynamicsExportParams
} from '../../data-statistics/data-statistics.model';
import {SearchAssistant, SearchAdapter} from '../../../share/search-assistant';
import {GlobalService} from '../../../core/global.service';
import {DataStatisticsHttpService} from '../../data-statistics/data-statistics-http.service';
import {GlobalConst} from '../../../share/global-const';
import {GroupEntity, GroupsHttpService} from '../../groups/groups-http.service';
import {SearchSelectorType} from '../../../share/components/search-selector/search-selector.model';
import {Subscription} from 'rxjs/Subscription';
import {SearchSelectorService} from '../../../share/components/search-selector/search-selector.service';
import {isNullOrUndefined} from 'util';
import {environment} from "../../../../environments/environment";
// import {OrderByType} from '../parking-state/parking-state.component';

@Component({
  selector: 'app-parking-state-complete',
  templateUrl: './parking-state-complete.component.html',
  styleUrls: ['./parking-state-complete.component.css']
})
export class ParkingStateCompleteComponent implements OnInit, SearchAdapter, OnDestroy {

  public showSelector = true; // 显示选择器
  public searchParams: ParkingDynamicsCompleteInfoParams = new ParkingDynamicsCompleteInfoParams();
  public exportParams: ParkingDynamicsExportParams = new ParkingDynamicsExportParams();

  public dataList: Array<ParkingDynamicsInfoEntity> = [];
  public dataInfo: RegionRealTimeDataEntity;

  public searchAssistant: SearchAssistant;

  public groupList: Array<GroupEntity> = [];

  public OrderByType = OrderByType;
  public OrderItemType = OrderItemType;
  public currentOrderItem = OrderItemType.status;
  public currentOrderType = OrderByType.reverse_order;
  private preSelectOrderItem = OrderItemType.status;

  private searchSubscription: Subscription;

  public isLoadComplete = false; // 数据是否加载完成

  @ViewChild('export') export: ElementRef;

  constructor(private globalService: GlobalService,
              private dataStatisticsHttpService: DataStatisticsHttpService,
              private groupsHttpService: GroupsHttpService,
              private searchSelectorService: SearchSelectorService) {
  }

  public ngOnInit() {
    this.searchSubscription = this.searchSelectorService.selectStateChanged.subscribe(state => {
      if (isNullOrUndefined(state)) {
        return;
      }
      // 必须是有效值
      let tempValue = '';
      switch (state.currentType) {
        case SearchSelectorType.Park:
          tempValue = state.currentValue;
          break;
        case SearchSelectorType.Region:
        case SearchSelectorType.Group:
          tempValue = GlobalConst.RegionID;
          break;
      }
      this.searchParams.region_id = tempValue;
      this.searchParams.page_num = 1;
      this.searchParams.page_size = GlobalConst.PageSize;
      this.searchAssistant = new SearchAssistant(this);
      this.searchAssistant.submitSearch(false);
      this.requestRegionRealTimeData(tempValue);
    });
    this.groupsHttpService.requestAllGroupsData(false).subscribe(groups => {
      this.groupList = groups;
    });
  }

  public ngOnDestroy() {
    this.searchSubscription && this.searchSubscription.unsubscribe();
  }

  /**
   * 获取实时动态信息各个数据数量
   */
  private requestRegionRealTimeData(regionID: string) {
    this.dataStatisticsHttpService.requestRegionRealTimeData(regionID).subscribe(data => {
      this.dataInfo = data;
    }, err => {
      this.globalService.httpErrorProcess(err);
    });
  }

  /**
   * 改变排序方式
   * @param {OrderItemType} orderItem 项
   * @param {OrderByType} orderType 正序/倒序
   */
  public onChangeOrderBtnClick(orderItem: OrderItemType, orderType: OrderByType) {
    if (orderItem !== this.preSelectOrderItem) {
      orderType = OrderByType.reverse_order;
    } else {
      orderType = (orderType === OrderByType.reverse_order) ? OrderByType.order : OrderByType.reverse_order;
    }
    const item = OrderItemType[orderItem];
    const order_by = orderType === OrderByType.order ? item : '-' + item;
    this.currentOrderItem = orderItem;
    this.currentOrderType = orderType;
    this.preSelectOrderItem = orderItem;
    this.searchParams.order_by = order_by;
    this.searchAssistant.submitSearch(false);
  }

  /* SearchAdapter 接口实现 */

  /* 请求检索 */
  public requestSearch(): any {
    this.isLoadComplete = false;
    return this.dataStatisticsHttpService.requestParkingDynamicInfoList(this.searchParams);
  }

  public continueSearch(url: string): any {
    return this.dataStatisticsHttpService.continueParkingDynamicInfoList(url);
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

  // 导出停车场状态excel列表
  public onParkingStateExportClick() {
    this.exportParams.derived_type = '2';
    this.exportParams.region_id = this.searchParams.region_id;
    this.exportParams.parking_name = this.searchParams.parking_name;
    this.exportParams.area_type = Number(this.searchParams.area_type);
    this.exportParams.parking_group_id = this.searchParams.parking_group_id;
    this.exportParams.status = this.searchParams.status;
    this.exportParams.parking_kind = this.searchParams.parking_kind;
    this.exportParams.operate_type = this.searchParams.operate_type;
    this.exportParams.parking_category = this.searchParams.parking_category;
    this.exportParams.opening_type = this.searchParams.opening_type;
    this.exportParams.company_name = this.searchParams.company_name;
    this.exportParams.platform_name = this.searchParams.platform_name;
    let tempBody = '';
    Object.getOwnPropertyNames(this.exportParams).forEach(property => {
      if (this.exportParams[property]) {
        tempBody += `${property}=` + encodeURIComponent(this.exportParams[property]) + '&';
      }
    });
    tempBody = tempBody.length > 0 ? tempBody.slice(0, tempBody.length - 1) : tempBody;
    window.open(`${environment.CIPP_UNIVERSE}/parking_dynamics/export?${tempBody}`);
    // console.log(this.export.nativeElement)
    this.export.nativeElement.blur();
  }

}

enum OrderItemType {
  total_num = 1,
  filling_rate,
  total_tmp_num,
  status,
}

export enum OrderByType {
  order = 1, //
  reverse_order, // 倒序
  disabled,
}
