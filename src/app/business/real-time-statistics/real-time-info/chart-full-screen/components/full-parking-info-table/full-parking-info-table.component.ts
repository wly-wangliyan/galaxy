import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ParkingCountEntity, TodayRealFlowEntity} from '../../../../../data-statistics/data-statistics.model';
import {DataStatisticsHttpService} from '../../../../../data-statistics/data-statistics-http.service';
import {GlobalConst} from '../../../../../../share/global-const';
import {GlobalService} from '../../../../../../core/global.service';
import {DateFormatHelper} from '../../../../../../../utils/date-format-helper';
import {Subscription} from 'rxjs/Subscription';
import {ChartFullScreenService} from '../../chart-full-screen.service';
import {SearchSelectorService} from '../../../../../../share/components/search-selector/search-selector.service';
import {DSUserHttpService} from '../../../../../data-statistics/services/ds-user-http.service';

@Component({
  selector: 'app-full-parking-info-table',
  templateUrl: './full-parking-info-table.component.html',
  styleUrls: ['./full-parking-info-table.component.css']
})
export class FullParkingInfoTableComponent implements OnInit, OnDestroy {

  @Input() public sourceSize: 'lg' | 'sm' = 'sm';

  public chartOptions: any;
  public chartInstance: any;

  public parkingCount: ParkingCountEntity;
  public flowDayList: Array<FlowDayItem>;
  public todayRealFlowData: TodayRealFlowEntity;
  public totalFlowCount = 0;
  public totalUserCount = 0;

  private timer5SecondsSubscription: Subscription;
  private timer5MinutesSubscription: Subscription;
  private timer30SecondsSubscription: Subscription;
  private dataSubscription: Subscription;
  private totalFlowSubscription: Subscription;
  private parkingCountSubscription: Subscription;
  private todayRealFlowSubscription: Subscription;
  private totalUserCountSubscription: Subscription;

  constructor(private dataStatisticsHttpService: DataStatisticsHttpService,
              private searchSelectorService: SearchSelectorService,
              private globalService: GlobalService,
              private fullScreenService: ChartFullScreenService) {
  }

  public ngOnInit() {
    this.requestEntryFlowByDayList();
    this.requestTotalEntryFlow();
    this.requestParkingCount();
    this.requestRealEntryFlow();
    this.requestTotalUserCount();
    this.timer5SecondsSubscription = this.fullScreenService.timer_5seconds.subscribe(() => {
      // this.requestTotalEntryFlow();
      this.requestRealEntryFlow();
    });
    this.timer5MinutesSubscription = this.fullScreenService.timer_5minutes.subscribe(() => {
      this.requestParkingCount();
      this.requestEntryFlowByDayList();
      this.requestTotalUserCount();
    });
    this.timer30SecondsSubscription = this.fullScreenService.timer_30seconds.subscribe(() => {
      this.requestTotalEntryFlow();
    });
  }

  public ngOnDestroy() {
    this.timer5MinutesSubscription && this.timer5MinutesSubscription.unsubscribe();
    this.timer5SecondsSubscription && this.timer5SecondsSubscription.unsubscribe();
    this.dataSubscription && this.dataSubscription.unsubscribe();
    this.parkingCountSubscription && this.parkingCountSubscription.unsubscribe();
    this.todayRealFlowSubscription && this.todayRealFlowSubscription.unsubscribe();
    this.totalUserCountSubscription && this.totalUserCountSubscription.unsubscribe();
    this.timer30SecondsSubscription && this.timer30SecondsSubscription.unsubscribe();
  }

  /**
   * 停车场总数（5min刷新一次）
   */
  private requestParkingCount() {
    this.parkingCountSubscription && this.parkingCountSubscription.unsubscribe();
    this.parkingCountSubscription = this.dataStatisticsHttpService.requestParkingCountData(GlobalConst.RegionID).subscribe(data => {
      this.parkingCount = data;
    }, err => {
      this.globalService.httpErrorProcess(err);
    });
  }

  /**
   * 请求今日实时流量数据
   */
  private requestRealEntryFlow() {
    this.todayRealFlowSubscription && this.todayRealFlowSubscription.unsubscribe();
    this.todayRealFlowSubscription = this.dataStatisticsHttpService.flow.requestRealTodayEntryFlow().subscribe(data => {
      this.todayRealFlowData = data;
    }, err => {
      this.globalService.httpErrorProcess(err);
    });
  }

  /**
   * 流量统计数据(5s一次)
   */
  private requestEntryFlowByDayList() {
    this.dataSubscription && this.dataSubscription.unsubscribe();
    this.dataSubscription = this.dataStatisticsHttpService.flow.requestRegionStatisticsEntryFlowByHourList(
      GlobalConst.RegionID,
      DateFormatHelper.Yesterday,
      DateFormatHelper.Today
    ).subscribe(data => {
      const entryFlowList = data;
      const flowDayList = this.generateFlowDayList();
      entryFlowList.forEach(item => {
        const day = DateFormatHelper.Format(item.time_point * 1000);
        flowDayList.forEach(flowDayItem => {
          if (flowDayItem.day === day) {
            flowDayItem.road_outside_entry_flow += item.road_outside_entry_flow;
            flowDayItem.road_inside_entry_flow += item.road_inside_entry_flow;
          }
        });
      });
      flowDayList.forEach(flowItem => {
        flowItem.total_flow = flowItem.road_inside_entry_flow + flowItem.road_outside_entry_flow;
      });
      this.flowDayList = flowDayList;
    }, err => {
      this.globalService.httpErrorProcess(err);
    });
  }

  /**
   * 请求所有入口流量(5s一次)
   */
  private requestTotalEntryFlow() {
    this.totalFlowSubscription && this.totalFlowSubscription.unsubscribe();
    this.totalFlowSubscription = this.dataStatisticsHttpService.flow.requestTotalRegionStatisticsEntryFlow().subscribe(data => {
      this.totalFlowCount = data.total_flow;
      console.log('总流量：', data.total_flow);
    }, err => {
      this.globalService.httpErrorProcess(err);
    });
  }

  /**
   * 请求所有用户数量(5min一次)
   */
  private requestTotalUserCount() {
    this.totalUserCountSubscription && this.totalUserCountSubscription.unsubscribe();
    this.totalUserCountSubscription = this.dataStatisticsHttpService.user.requestTotalUserCount().subscribe(data => {
      this.totalUserCount = data.total_user;
    }, err => {
      this.globalService.httpErrorProcess(err);
    });
  }

  private generateFlowDayList(): Array<FlowDayItem> {
    const flowDayList = [];
    flowDayList.push(new FlowDayItem('今日', DateFormatHelper.Today));
    flowDayList.push(new FlowDayItem('昨日', DateFormatHelper.Yesterday));
    return flowDayList;
  }

}

export class FlowDayItem {
  public name: string;
  public time: number;
  public road_outside_entry_flow = 0;
  public road_inside_entry_flow = 0;
  public total_flow = 0;
  public day: string;

  constructor(name: string, date: Date) {
    this.name = name;
    this.time = new Date(date).getTime() / 1000;
    this.day = DateFormatHelper.Format(this.time * 1000);
  }
}
