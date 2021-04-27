import {Component, OnInit} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {ItemEntity, RealStatusEntity, TodayRealFlowEntity} from '../../../../../data-statistics/data-statistics.model';
import {DataStatisticsHttpService} from '../../../../../data-statistics/data-statistics-http.service';
import {GlobalConst} from '../../../../../../share/global-const';
import {SearchSelectorService} from '../../../../../../share/components/search-selector/search-selector.service';
import {GlobalService} from '../../../../../../core/global.service';
import {ChartFullScreenService} from '../../../chart-full-screen/chart-full-screen.service';
import {Subscription} from 'rxjs/Subscription';
import {FlowDayItem} from '../../../chart-full-screen/components/full-parking-info-table/full-parking-info-table.component';

@Component({
  selector: 'app-screen7-left-one',
  templateUrl: './screen7-left-one.component.html',
  styleUrls: ['./screen7-left-one.component.less']
})
export class Screen7LeftOneComponent implements OnInit {

  public realStatusData: RealStatusEntity = new RealStatusEntity();
  public testNumber = '1001';

  // public parkingCount: ParkingCountEntity;
  public flowDayList: Array<FlowDayItem>;
  public todayRealFlowData: TodayRealFlowEntity;
  public totalFlowCount = 0;
  public totalUserCount = 0;
  public parkingCount: Array<ItemEntity> = [];
  public parkingCount1 = [];

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

  ngOnInit(): void {
    this.requestParkingCount();
    // this.timer5MinutesSubscription = this.fullScreenService.timer_5minutes.subscribe(() => {
    //   this.requestParkingCount();
    // });
    // this.requestData();
    // interval(3000).subscribe(() => {
    //   this.testNumber = (Number(this.testNumber) + 1).toString();
    // });
  }

  // public requestData() {
  //   this.dataStatisticsHttpService.requestRealStatusData().subscribe(result => {
  //     this.realStatusData = result;
  //   });
  // }

  public toString(value: any): string {
    if (isNullOrUndefined(value)) {
      return '';
    }
    return String(value);
  }

  /**
   * 停车场总数（5min刷新一次）
   */
  private requestParkingCount() {
    this.parkingCountSubscription && this.parkingCountSubscription.unsubscribe();
    this.parkingCountSubscription = this.dataStatisticsHttpService.requestParkingCountData(GlobalConst.RegionID).subscribe(data => {
      // this.realStatusData.parking_count.value = data.total_num;
      // this.realStatusData.parking_count.detail = data;
      for (const item in data) {
        this.parkingCount1.push(item); //属性
      }
      console.log(this.parkingCount1);
    }, err => {
      this.globalService.httpErrorProcess(err);
    });
  }

  private dataFormat(data: object): Array<ItemEntity> {
    console.log(Object.keys(data));
    return Object.getOwnPropertyNames(data).map(item => {
      const obj = new ItemEntity();
      obj.name = item;
      obj.value = data[item];
      return obj;
    });
  }

}
