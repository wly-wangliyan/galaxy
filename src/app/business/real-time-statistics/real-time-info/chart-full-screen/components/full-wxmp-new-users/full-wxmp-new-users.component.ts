import {Component, EventEmitter, Input, OnInit, Output, OnDestroy} from '@angular/core';
import {DataStatisticsHttpService} from '../../../../../data-statistics/data-statistics-http.service';
import {EChartHelper} from '../../../../../../../utils/echart-helper';
import {Observable} from 'rxjs/Observable';
import {RegionEntryFlowByHourEntity} from '../../../../../data-statistics/data-statistics.model';
import {DateFormatHelper} from '../../../../../../../utils/date-format-helper';
import {Subscription} from 'rxjs/Subscription';
import {GlobalService} from '../../../../../../core/global.service';
import {ChartFullScreenService} from '../../chart-full-screen.service';
import {NewUserParams} from '../../../../../data-statistics/services/ds-user-http.service';

@Component({
  selector: 'app-full-wxmp-new-users',
  templateUrl: './full-wxmp-new-users.component.html',
  styleUrls: ['./full-wxmp-new-users.component.less']
})
export class FullWxmpNewUsersComponent implements OnInit, OnDestroy {

  @Input() public sourceWidth: string;
  @Input() public sourceHeight: string;
  @Input() public sourceSize: 'lg' | 'sm' | 'superlg' = 'lg';

  @Output() public entryFlowComplete: EventEmitter<Array<RegionEntryFlowByHourEntity>> = new EventEmitter();
  public chartOptions: any;
  public chartInstance: any;

  public startTime: number;
  public endTime: number;

  private searchParams: NewUserParams = new NewUserParams();
  private userCountList: Array<number> = new Array(30).fill(0);
  private dateList: Array<string>;

  private timerSubscription: Subscription;
  private dataSubscription: Subscription;

  constructor(private dataStatisticsHttpService: DataStatisticsHttpService,
              private globalService: GlobalService,
              private fullScreenService: ChartFullScreenService) {
    this.startTime = DateFormatHelper.DateToTimeStamp(DateFormatHelper.Ago(31), true);
    this.endTime = DateFormatHelper.DateToTimeStamp(DateFormatHelper.Ago(1), false);
  }

  public ngOnInit() {
    this.requestAllData();
    this.timerSubscription = this.fullScreenService.timer_60minutes.subscribe(() => {
      this.requestAllData();
    });
  }

  /* 30天的时间戳 */
  private generateDateList(isFromYestoday: boolean) {
    // 当前未超过9点，取前天之前30天数据，超过9点，取昨天之前30天数据
    let start_time;
    if (!isFromYestoday) {
      // 从前天开始往前推30天
      start_time = DateFormatHelper.DateToTimeStamp(DateFormatHelper.Ago(31), true);
    } else {
      // 从昨天开始往前推30天
      start_time = DateFormatHelper.DateToTimeStamp(DateFormatHelper.Ago(30), true);
    }
    this.dateList = [];
    for (let index = 0; index < 30; index++) {
      this.dateList.push(DateFormatHelper.Format(start_time * 1000 + index * 24 * 60 * 60 * 1000, 'MM-dd'));
    }
  }

  private requestAllData() {
    this.dataSubscription && this.dataSubscription.unsubscribe();
    this.searchParams.section = this.startTime + ',' + this.endTime;
    this.dataSubscription = this.dataStatisticsHttpService.user.requestWechatNewUserCountByDay(this.searchParams).subscribe(data => {
      if (data.length === 31) {
        this.generateDateList(true);
        // 如果获取到31个数据，则去掉第一个数据，开始时间从第二个数据的时间
        data.shift();
        this.startTime = DateFormatHelper.DateToTimeStamp(DateFormatHelper.Ago(30), true);
      } else {
        this.generateDateList(false);
      }
      data.forEach(item => {
        const index = (item.time_point - this.startTime) / 60 / 60 / 24;
        this.userCountList[index] = this.userCountList[index] + item.wechat_new_user;
      });
      this.generateChart();
    }, err => {
      this.globalService.httpErrorProcess(err);
    });
  }

  public ngOnDestroy() {
    this.timerSubscription && this.timerSubscription.unsubscribe();
    this.dataSubscription && this.dataSubscription.unsubscribe();
  }

  public onChartInit(chartInstance: any) {
    this.chartInstance = chartInstance;
  }

  private generateChart() {
    Observable.timer(0).subscribe(() => {
      this.chartOptions = this.generateChartOptions();
      this.chartInstance && this.chartInstance.setOption(this.chartOptions, true);
    });
  }

  public generateChartOptions() {
    const multiple = this.sourceSize === 'superlg' ? 2 : 1;
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          'type': 'line' // 默认为直线，可选为：'line' | 'shadow'
        },
        confine: true, // 是否将 tooltip 框限制在图表的区域内。
        formatter: (params, ticket, callback) => {
          let message = params[0].name + '日';
          for (const param of params) {
            message += '<br/>' + '新增用户数' + ' : ' + EChartHelper.FormatFlow(param.data, '个');
          }
          return message;
        }
      },
      calculable: true,
      grid: {
        bottom: multiple * 20,
        left: multiple * 10,
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          axisLabel: {
            color: '#c8e9fd',
            fontSize: multiple * 12,
            showMinLabel: true,
            showMaxLabel: true,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#2283e3',
              width: multiple * 1
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          boundaryGap: false,
          data: this.dateList
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            color: '#c8e9fd',
            fontSize: multiple * 12,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#2283e3',
              width: multiple * 1
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          splitNumber: 3,
          minInterval: 1,
        }
      ],
      series: [
        {
          name: '新增用户数',
          type: 'line',
          symbol: 'circle',
          symbolSize: multiple * 4,
          showAllSymbol: true,
          data: this.userCountList,
          lineStyle: {
            width: multiple * 2
          }
        }
      ],
      color: ['#56c74e']
    };
  }

}
