import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {GlobalService} from '../../../../../../core/global.service';
import {DataStatisticsHttpService} from '../../../../../data-statistics/data-statistics-http.service';
import {RegionEntryFlowByHourEntity} from '../../../../../data-statistics/data-statistics.model';
import {Observable} from 'rxjs/Observable';
import {GlobalConst} from '../../../../../../share/global-const';
import {ChartXY, ChartXYValue, EChartHelper} from '../../../../../../../utils/echart-helper';
import {ChartFullScreenService} from '../../../chart-full-screen/chart-full-screen.service';
import {DateFormatHelper} from '../../../../../../../utils/date-format-helper';
import {Subscription} from 'rxjs/Subscription';
import {TableItem} from '../../../../../data-statistics/history-statistics/history-flow/history-flow.component';

@Component({
  selector: 'app-full-turnover-rate2',
  templateUrl: './full-turnover-rate2.component.html',
  styleUrls: ['./full-turnover-rate2.component.css']
})
export class FullTurnoverRate2Component implements OnInit, OnDestroy {

  @Input() public sourceWidth: string;
  @Input() public sourceHeight: string;
  @Input() public sourceSize: 'lg' | 'sm' | 'superlg' = 'superlg';

  @Input() // 区分1：路内或2：路外
  public set areaType(area_type: number) {
    this.fullTitle = area_type === 1 ? '路内日周转率' : '路外日周转率';
    this._areaType = area_type;
  }

  private _areaType: number;
  public get areaType(): number {
    return this._areaType;
  }

  @Output() public entryFlowComplete: EventEmitter<Array<RegionEntryFlowByHourEntity>> = new EventEmitter();

  public chartOptions: any;
  public chartInstance: any;

  public fullTitle: string;
  public todayTurnoverRate: number; // 今日周转率

  private turnoverRateList: Array<ChartXYValue>;
  private timerSubscription: Subscription;
  private dataSubscription: Subscription;

  constructor(private dataStatisticsHttpService: DataStatisticsHttpService,
              private globalService: GlobalService,
              private fullScreenService: ChartFullScreenService) {
  }

  public ngOnInit() {
    this.requestTurnoverRateData();
    this.timerSubscription = this.fullScreenService.timer_5minutes.subscribe(() => {
      this.requestTurnoverRateData();
    });
  }

  private requestTurnoverRateData() {
    const endDate = DateFormatHelper.Today;
    const startDate = DateFormatHelper.AWeekAgo;
    const processBlock = (results) => {
      // 初始化数据
      const insideTurnoverRates = EChartHelper.GenerateDateArray(startDate, endDate, 'MM-dd');
      const outsideTurnoverRates = EChartHelper.GenerateDateArray(startDate, endDate, 'MM-dd');

      // 加工数据
      insideTurnoverRates.forEach((XYValue, chartIndex) => {
        for (const index in results) {
          const keyTime = DateFormatHelper.Format(new Date(results[index].time_point * 1000));
          const currentYear = DateFormatHelper.NowDate('yyyy');
          if (currentYear + '-' + XYValue.XValue === keyTime) {
            // 遍历数据源与图表项,将X轴时间显示相等的项的数据进行赋值
            insideTurnoverRates[chartIndex].YValue = Number(results[index].road_inside_turnover_rate).toFixed(2);
            outsideTurnoverRates[chartIndex].YValue = Number(results[index].road_outside_turnover_rate).toFixed(2);
            return;
          }
        }
      });

      // 赋值
      if (this.areaType === 1) {
        this.turnoverRateList = insideTurnoverRates;
        const todayTurnoverRate = insideTurnoverRates[insideTurnoverRates.length - 1].YValue;
        this.todayTurnoverRate = todayTurnoverRate < 0.001 ? 0.001 : todayTurnoverRate;
      } else if (this.areaType === 2) {
        this.turnoverRateList = outsideTurnoverRates;
        const todayTurnoverRate = outsideTurnoverRates[outsideTurnoverRates.length - 1].YValue;
        this.todayTurnoverRate = todayTurnoverRate < 0.001 ? 0.001 : todayTurnoverRate;
      }

      // 更新图表
      this.generateChart();
    };
    this.dataSubscription && this.dataSubscription.unsubscribe();
    this.dataSubscription = this.dataStatisticsHttpService.turnoverRate.requestAllRegionStatisticsTurnoverRateByDayList(GlobalConst.RegionID, startDate, endDate).subscribe(results => {
      processBlock(results);
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

    const multiple = this.sourceSize === 'superlg' ? 2 : 1;
    const chartXY = EChartHelper.GenerateChartXY(this.turnoverRateList);

    Observable.timer(0).subscribe(() => {
      this.chartOptions = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            'type': 'line' // 默认为直线，可选为：'line' | 'shadow'
          },
          confine: true, // 是否将 tooltip 框限制在图表的区域内。
          formatter: (params, ticket, callback) => {
            let message = params[0].axisValue;
            for (const param of params) {
              message += '<br/>' + param.seriesName + ' : ' + param.data;
            }
            return message;
          }
        },
        calculable: true,
        grid: {
          top: 40 * multiple,
          bottom: 20 * multiple,
          left: 10 * multiple,
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            axisLabel: {
              color: '#C8EBFF',
              fontSize: multiple * 12,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#3969F3',
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
            data: chartXY.chartX
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '周转率',
            nameTextStyle: {
              color: '#C8EBFF',
              fontSize: multiple * 12,
              padding: [0, 0, multiple * 5, 0]
            },
            axisLabel: {
              color: '#C8EBFF',
              fontSize: multiple * 12,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#3969F3',
                width: multiple * 1
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            minInterval: 0.3,
          }
        ],
        series: [
          {
            name: '周转率',
            type: 'line',
            symbol: 'circle',
            symbolSize: multiple * 4,
            showAllSymbol: true,
            data: chartXY.chartY,
            lineStyle: {
              width: multiple * 2
            }
          }
        ],
        color: ['#00ffd6']
      };
      this.chartInstance && this.chartInstance.setOption(this.chartOptions, true);
    });
  }

}
