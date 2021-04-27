import {Component, OnInit, OnDestroy} from '@angular/core';
import {SearchAssistant, SearchAdapter} from '../../../../share/search-assistant';
import {DataStatisticsHttpService} from '../../data-statistics-http.service';
import {SearchSelectorService} from '../../../../share/components/search-selector/search-selector.service';
import {GlobalService} from '../../../../core/global.service';
import {Subscription} from 'rxjs/Subscription';
import {SearchSelectorType} from '../../../../share/components/search-selector/search-selector.model';
import {
  GroupRealTimeStatisticsParams, RegionRealTimeStatisticsParams, ParkingRealTimeStatisticsParams
} from '../../data-statistics.model';
import {GlobalConst} from '../../../../share/global-const';
import {DateFormatHelper} from '../../../../../utils/date-format-helper';
import {GroupsHttpService} from '../../../groups/groups-http.service';

@Component({
  selector: 'app-real-time-data',
  templateUrl: './real-time-data.component.html',
  styleUrls: ['./real-time-data.component.css', '../../data-statistics.component.css'],
  providers: [GroupsHttpService]
})
export class RealTimeDataComponent implements OnInit, OnDestroy, SearchAdapter {

  public SearchSelectorType = SearchSelectorType;

  private parkingParams = new ParkingRealTimeStatisticsParams();
  private groupParams = new GroupRealTimeStatisticsParams();
  private regionParams = new RegionRealTimeStatisticsParams();
  public searchParams: any;

  public searchAssistant: SearchAssistant;

  private searchSubscription: Subscription;
  private dataSubscription: Subscription;
  private countSubscription: Subscription;

  public totalParkingCount = 0;
  public totalFlowCount = 0;
  public titleName = '停车场数'; // 标题名称
  public tableName = '停车场'; // 第一列名称
  public dataList: Array<any> = [];

  public currentSelectorType = SearchSelectorType.Park;
  private currentValue = '';

  public isLoadComplete = false; // 数据加载完成

  constructor(private dataStatisticsHttpService: DataStatisticsHttpService,
              private searchSelectorService: SearchSelectorService, private globalService: GlobalService, private groupsHttpService: GroupsHttpService) {
  }

  public ngOnInit() {
    this.searchAssistant = new SearchAssistant(this);
    this.searchSubscription = this.searchSelectorService.selectStateChanged.subscribe(state => {
      this.currentSelectorType = state.currentType;
      this.currentValue = state.currentValue;
      switch (state.currentType) {
        case SearchSelectorType.Group:
          this.titleName = '分组数';
          this.tableName = '组名称';
          this.groupParams.page_num = 1;
          this.groupParams.page_size = GlobalConst.PageSize;
          this.groupParams.order_by = '-entry_flow';
          this.searchParams = this.groupParams;
          this.searchAssistant.submitSearch(true);

          // 获取分组数
          this.countSubscription = this.groupsHttpService.requestAllGroupCount().subscribe(num => {
            this.totalParkingCount = num;
          }, err => {
            this.totalParkingCount = 0;
            this.globalService.httpErrorProcess(err);
          });

          // 获取总流量数
          this.dataSubscription && this.dataSubscription.unsubscribe();
          this.dataSubscription = this.dataStatisticsHttpService.flow
            .requestGroupStatisticsTotalEntryFlowByDayList(DateFormatHelper.Today, DateFormatHelper.Today).subscribe(results => {
              this.totalFlowCount = results.length > 0 ? results[0].entry_flow : 0;
            }, err => {
              this.totalFlowCount = 0;
              this.globalService.httpErrorProcess(err);
            });

          break;
        case SearchSelectorType.Region:
          this.titleName = '行政区数';
          this.tableName = '行政区域';
          this.regionParams.page_num = 1;
          this.regionParams.page_size = GlobalConst.PageSize;
          this.regionParams.order_by = '-entry_flow';
          this.searchParams = this.regionParams;

          // 获取行政区域数
          this.countSubscription && this.countSubscription.unsubscribe();
          this.countSubscription = this.globalService.getRegionById(this.currentValue).subscribe(results => {
            // FIXME: 不具备复用性，切换新系统时会出错 by zwl 2018.3.8
            this.totalParkingCount = results[0].cities[0].districts.length;
          }, err => {
            this.totalParkingCount = 0;
            this.globalService.httpErrorProcess(err);
          });

          // 获取总流量数
          this.dataSubscription && this.dataSubscription.unsubscribe();
          this.dataSubscription = this.dataStatisticsHttpService.flow
            .requestRegionStatisticsTotalEntryFlowByDayList(this.currentValue, DateFormatHelper.Today, DateFormatHelper.Today).subscribe(results => {
              this.totalFlowCount = results.length > 0 ? results[0].entry_flow : 0;
            }, err => {
              this.totalFlowCount = 0;
              this.globalService.httpErrorProcess(err);
            });

          // 如果区域id值存在时才会进行检索
          this.searchAssistant.submitSearch(true);
          break;
        case SearchSelectorType.Park:
          this.titleName = '停车场数';
          this.tableName = '停车场';
          this.parkingParams.page_num = 1;
          this.parkingParams.page_size = GlobalConst.PageSize;
          this.parkingParams.order_by = '-entry_flow';
          this.parkingParams.region_id = state.currentValue;
          this.searchParams = this.parkingParams;
          // 获取停车场数
          this.countSubscription && this.countSubscription.unsubscribe();
          this.countSubscription = this.dataStatisticsHttpService.requestParkingCountData(this.currentValue, null).subscribe(entity => {
            this.totalParkingCount = entity.total_num;
          }, err => {
            this.totalParkingCount = 0;
            this.globalService.httpErrorProcess(err);
          });

          // 获取总流量数
          this.dataSubscription && this.dataSubscription.unsubscribe();
          // 调用区域统计的接口即可
          this.dataSubscription = this.dataStatisticsHttpService.flow
            .requestRegionStatisticsTotalEntryFlowByDayList(this.currentValue, DateFormatHelper.Today, DateFormatHelper.Today).subscribe(results => {
              this.totalFlowCount = results.length > 0 ? results[0].entry_flow : 0;
            }, err => {
              this.totalFlowCount = 0;
              this.globalService.httpErrorProcess(err);
            });

          // 如果区域id值存在时才会进行检索
          this.searchAssistant.submitSearch(true);
          break;
      }
    });
  }

  public ngOnDestroy() {
    this.searchSubscription && this.searchSubscription.unsubscribe();
    this.dataSubscription && this.dataSubscription.unsubscribe();
    this.countSubscription && this.countSubscription.unsubscribe();
  }

  public onChangeFlowOrderBtnClick() {
    this.searchParams.order_by = this.searchParams.order_by === '-entry_flow' ? 'entry_flow' : '-entry_flow';
    this.searchAssistant.submitSearch(true);
  }

  public onChangeFillingRateOrderBtnClick() {
    this.searchParams.order_by = this.searchParams.order_by === '-filling_rate' ? 'filling_rate' : '-filling_rate';
    this.searchAssistant.submitSearch(true);
  }

  /* SearchAdapter 接口实现 */
  /* 请求检索 */
  public requestSearch(): any {
    this.isLoadComplete = false;
    switch (this.currentSelectorType) {
      case SearchSelectorType.Park:
        // 查区域的数据即可
        return this.dataStatisticsHttpService.requestParkingRealTimeStatisticsList(this.parkingParams);
      case SearchSelectorType.Group:
        return this.dataStatisticsHttpService.requestGroupRealTimeStatisticsList(this.groupParams);
      case SearchSelectorType.Region:
        return this.dataStatisticsHttpService.requestRegionRealTimeStatisticsList(this.regionParams);
    }
  }

  public continueSearch(url: string): any {
    switch (this.currentSelectorType) {
      case SearchSelectorType.Park:
        return this.dataStatisticsHttpService.continueParkingRealTimeStatisticsList(url);
      case SearchSelectorType.Group:
        return this.dataStatisticsHttpService.continueGroupRealTimeStatisticsList(url);
      case SearchSelectorType.Region:
        return this.dataStatisticsHttpService.continueRegionRealTimeStatisticsList(url);
    }
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
    
    this.isLoadComplete = true;
    this.dataList = results;
  }
}
