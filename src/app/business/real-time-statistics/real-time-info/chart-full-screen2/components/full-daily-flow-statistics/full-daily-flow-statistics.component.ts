import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DataStatisticsHttpService} from '../../../../../data-statistics/data-statistics-http.service';
import {Observable} from 'rxjs/Observable';
import {ChartXYValue, ComputingCycle, EChartHelper} from '../../../../../../../utils/echart-helper';
import {Subscription} from 'rxjs/Subscription';
import {GlobalService} from '../../../../../../core/global.service';
import {GlobalConst} from '../../../../../../share/global-const';
import {ChartFullScreenService} from '../../../chart-full-screen/chart-full-screen.service';
import {DateFormatHelper} from '../../../../../../../utils/date-format-helper';

@Component({
  selector: 'app-full-daily-flow-statistics',
  templateUrl: './full-daily-flow-statistics.component.html',
  styleUrls: ['./full-daily-flow-statistics.component.css']
})
export class FullDailyFlowStatisticsComponent implements OnInit, OnDestroy {

  @Input() public sourceWidth: string;
  @Input() public sourceHeight: string;

  @Input() // 区分1：路内或2：路外
  public set areaType(area_type: number) {
    this.fullTitle = area_type === 1 ? '路内日流量统计' : '路外日流量统计';
    this._areaType = area_type;
  }

  private _areaType = 2;
  public get areaType() {
    return this._areaType;
  }

  public chartOptions: any;
  public chartInstance: any;

  public fullTitle = '';
  private flowDataList: Array<ChartXYValue>;

  private timerSubscription: Subscription;
  private flowDataSubscription: Subscription;

  constructor(private dataStatisticsHttpService: DataStatisticsHttpService,
              private globalService: GlobalService,
              private fullScreenService: ChartFullScreenService) {
  }

  public ngOnInit() {
    this.requestFlowData();
    this.timerSubscription = this.fullScreenService.timer_5minutes.subscribe(() => {
      this.requestFlowData();
    });
  }

  private requestFlowData() {
    const startDate = DateFormatHelper.AWeekAgo;
    const endDate = DateFormatHelper.Today;
    const currentCycle = ComputingCycle.day;
    const processBlock = (results) => {
      // 初始化数据
      const insideDaysFlow = EChartHelper.GenerateCycleArray(startDate, endDate, currentCycle, 'MM-dd');
      const outsideDaysFlow = EChartHelper.GenerateCycleArray(startDate, endDate, currentCycle, 'MM-dd');

      // 加工数据
      insideDaysFlow.forEach((XYValue, chartIndex) => {
        for (const index in results) {
          const keyTime = DateFormatHelper.Format(new Date(results[index].time_point * 1000));
          const currentYear = DateFormatHelper.NowDate('yyyy');
          if (currentYear + '-' + XYValue.XValue === keyTime) {
            // 遍历数据源与图表项,将X轴时间显示相等的项的数据进行赋值
            insideDaysFlow[chartIndex].YValue = results[index].road_inside_entry_flow;
            outsideDaysFlow[chartIndex].YValue = results[index].road_outside_entry_flow;
            return;
          }
        }
      });

      if (this.areaType === 1) {
        this.flowDataList = insideDaysFlow;
      } else {
        this.flowDataList = outsideDaysFlow;
      }
      // 更新图表
      this.generateChart();
    };
    this.flowDataSubscription && this.flowDataSubscription.unsubscribe();
    this.flowDataSubscription = this.dataStatisticsHttpService.flow.requestAllRegionStatisticsEntryFlowByDayList(GlobalConst.RegionID, startDate, endDate).subscribe(results => {
      processBlock(results);
    }, err => {
      this.globalService.httpErrorProcess(err);
    });
  }

  public ngOnDestroy() {
    this.timerSubscription && this.timerSubscription.unsubscribe();
    this.flowDataSubscription && this.flowDataSubscription.unsubscribe();
  }

  public onChartInit(chartInstance: any) {
    this.chartInstance = chartInstance;
  }

  private generateChart() {
    Observable.timer(0).subscribe(() => {

      const chartXY = EChartHelper.GenerateChartXY(this.flowDataList);

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
              message += '<br/>' + param.seriesName + '流量' + ' : ' + EChartHelper.FormatFlow(param.data);
            }
            return message;
          }
        },
        calculable: true,
        grid: {
          top: 40,
          bottom: 20,
          left: 10,
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            axisLabel: {
              color: '#C8EBFF',
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#3969F3'
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
            name: '流量(辆)',
            nameTextStyle: {
              color: '#C8EBFF',
              padding: [0, 0, 5, 0]
            },
            axisLabel: {
              color: '#C8EBFF',
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#3969F3'
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
            name: '入场',
            type: 'line',
            symbol: 'circle',
            showAllSymbol: true,
            data: chartXY.chartY
          }
        ],
        color: ['#00ffd6']
      };
      this.chartInstance && this.chartInstance.setOption(this.chartOptions, true);
    });
  }

}
