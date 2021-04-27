import {Component, EventEmitter, Input, OnInit, Output, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {GlobalService} from '../../../../../../core/global.service';
import {DataStatisticsHttpService} from '../../../../../data-statistics/data-statistics-http.service';
import {DateFormatHelper} from '../../../../../../../utils/date-format-helper';
import {GlobalConst} from '../../../../../../share/global-const';
import {Observable} from 'rxjs/Observable';
import {
  RegionEntryFlowByHourEntity
} from '../../../../../data-statistics/data-statistics.model';
import {EChartHelper} from '../../../../../../../utils/echart-helper';
import {ChartFullScreenService} from '../../chart-full-screen.service';
import {NgxEchartsService} from 'ngx-echarts';

@Component({
  selector: 'app-full-flow-distribution-curve',
  templateUrl: './full-flow-distribution-curve.component.html',
  styleUrls: ['./full-flow-distribution-curve.component.css'],
  providers: [NgxEchartsService]
})
export class FullFlowDistributionCurveComponent implements OnInit, OnDestroy {

  @Input() public sourceWidth: string;
  @Input() public sourceHeight: string;
  @Input() public sourceSize: 'lg' | 'sm' = 'lg';

  @Output() public entryFlowComplete: EventEmitter<Array<RegionEntryFlowByHourEntity>> = new EventEmitter();

  public chartOptions: any;
  public chartInstance: any;

  private entryFlowList: Array<number> = new Array(12).fill(0);
  private exitFlowList: Array<number> = new Array(12).fill(0);

  private timerSubscription: Subscription;
  private dataSubscription: Subscription;

  constructor(private dataStatisticsHttpService: DataStatisticsHttpService,
              private globalService: GlobalService,
              private fullScreenService: ChartFullScreenService,
              private nes: NgxEchartsService) {
  }

  public ngOnInit() {
    this.requestAllData();
    this.timerSubscription = this.fullScreenService.timer_1minutes.subscribe(() => {
      this.requestAllData();
    });
  }

  private requestAllData() {
    const httpList = [];
    httpList.push(this.dataStatisticsHttpService.flow.requestRegionStatisticsExitFlowByHourList(GlobalConst.RegionID, DateFormatHelper.Today, DateFormatHelper.Today));
    httpList.push(this.dataStatisticsHttpService.flow.requestRegionStatisticsEntryFlowByHourList(
      GlobalConst.RegionID, DateFormatHelper.Today, DateFormatHelper.Today));
    this.dataSubscription && this.dataSubscription.unsubscribe();

    this.dataSubscription = Observable.forkJoin(httpList).subscribe((results: Array<any>) => {
      this.entryFlowList = new Array(12).fill(0);
      this.exitFlowList = new Array(12).fill(0);
      const exitFlowByHourList = results[0];
      const entryFlowByHourList = results[1];
      this.entryFlowComplete.emit(results[1]);
      exitFlowByHourList.forEach(item => {
        const keyHour = new Date(item.time_point * 1000).getHours();
        this.exitFlowList[Math.floor(keyHour / 2)] += item.total_exit_flow;
      });
      entryFlowByHourList.forEach(item => {
        const keyHour = new Date(item.time_point * 1000).getHours();
        this.entryFlowList[Math.floor(keyHour / 2)] += item.total_entry_flow;
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
      this.chartOptions = {
        title: {
          subtext: '流量(辆)',
          subtextStyle: {
            color: '#c8e9fd',
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            'type': 'line' // 默认为直线，可选为：'line' | 'shadow'
          },
          confine: true, // 是否将 tooltip 框限制在图表的区域内。
          formatter: (params, ticket, callback) => {
            let message = (params[0].axisValue - 2) + '~' + params[0].axisValue + '时';
            for (const param of params) {
              message += '<br/>' + param.seriesName + '流量' + ' : ' + EChartHelper.FormatFlow(param.data);
            }
            setTimeout(() => {
              callback(ticket, message);
            }, 0);
            return message;
          }
        },
        legend: {
          data: [
            {
              name: '出场',
              icon: 'circle',
              textStyle: {
                color: '#fff'
              }
            },
            {
              name: '入场',
              icon: 'circle',
              textStyle: {
                color: '#fff'
              }
            }
          ],
          right: 10,
          top: 10,
        },
        calculable: true,
        grid: {
          bottom: 20,
          left: 10,
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            axisLabel: {
              color: '#c8e9fd',
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#2283e3'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            boundaryGap: false,
            data: ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24']
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              color: '#c8e9fd',
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#2283e3'
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
            name: '出场',
            type: 'line',
            symbol: 'circle',
            data: this.exitFlowList
          },
          {
            name: '入场',
            type: 'line',
            symbol: 'circle',
            data: this.entryFlowList
          }
        ],
        color: ['#FFB21C', '#56c74e']
      };
      this.chartInstance && this.chartInstance.setOption(this.chartOptions, true);
    });
  }

}
