import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {RegionEntryFlowByHourEntity} from '../../../../../data-statistics/data-statistics.model';
import {Subscription} from 'rxjs/Subscription';
import {DataStatisticsHttpService} from '../../../../../data-statistics/data-statistics-http.service';
import {GlobalService} from '../../../../../../core/global.service';
import {ChartFullScreenService} from '../../../chart-full-screen/chart-full-screen.service';
import {NgxEchartsService} from 'ngx-echarts';
import {GlobalConst} from '../../../../../../share/global-const';
import {DateFormatHelper} from '../../../../../../../utils/date-format-helper';
import {Observable} from 'rxjs/Observable';
import {ChartXYValue, EChartHelper} from '../../../../../../../utils/echart-helper';
import {timer} from 'rxjs/observable/timer';

@Component({
  selector: 'app-full-flow-distribution-curve3',
  templateUrl: './full-flow-distribution-curve3.component.html',
  styleUrls: ['./full-flow-distribution-curve3.component.css']
})
export class FullFlowDistributionCurve3Component implements OnInit, OnDestroy {

  // @Input() public sourceWidth: string;
  // @Input() public sourceHeight: string;
  @Input() public sourceSize: 'lg' | 'sm' | 'superlg' = 'superlg';

  @Input() // 区分1：路内或2：路外
  public set areaType(area_type: number) {
    this.fullTitle = area_type === 1 ? '路内出入场时间分布' : '路外出入场时间分布';
    this._areaType = area_type;
  }

  @Output() public entryFlowComplete: EventEmitter<Array<RegionEntryFlowByHourEntity>> = new EventEmitter();

  private _areaType: number;
  public get areaType(): number {
    return this._areaType;
  }

  public chartOptions: any;
  public chartInstance: any;

  public fullTitle: string;

  private entryFlowArray: Array<ChartXYValue>;
  private exitFlowArray: Array<ChartXYValue>;

  private timerSubscription: Subscription;
  private dataSubscription: Subscription;

  constructor(private dataStatisticsHttpService: DataStatisticsHttpService,
              private globalService: GlobalService,
              private fullScreenService: ChartFullScreenService) {
  }

  public ngOnInit() {
    this.requestAllData();
    this.timerSubscription = this.fullScreenService.timer_1minutes.subscribe(() => {
      this.requestAllData();
    });
  }

  /* 定制按小时显示的X轴数据 */
  private generateCurrentHourArray() {
    const array = new Array<ChartXYValue>();
    const currentHour = DateFormatHelper.Now.getHours();
    const endHour = currentHour % 2 === 0 ? currentHour + 2 : currentHour + 1;
    for (let hour = 1; hour <= endHour; hour++) {
      if (hour % 2 === 0) {
        array.push(new ChartXYValue(hour.toString(), 0));
      }
    }
    return array;
  }

  private requestAllData() {
    const httpList = [];
    httpList.push(this.dataStatisticsHttpService.flow.requestRegionStatisticsExitFlowByHourList(GlobalConst.RegionID, DateFormatHelper.Today, DateFormatHelper.Today));
    httpList.push(this.dataStatisticsHttpService.flow.requestRegionStatisticsEntryFlowByHourList(
      GlobalConst.RegionID, DateFormatHelper.Today, DateFormatHelper.Today));
    this.dataSubscription && this.dataSubscription.unsubscribe();

    this.dataSubscription = Observable.forkJoin(httpList).subscribe((results: Array<any>) => {
      this.entryFlowArray = this.generateCurrentHourArray();
      this.exitFlowArray = this.generateCurrentHourArray();

      const exitFlowByHourList = results[0];
      const entryFlowByHourList = results[1];
      this.entryFlowComplete.emit(results[1]);
      exitFlowByHourList.forEach(item => {
        const keyHour = new Date(item.time_point * 1000).getHours();
        if (this.areaType === 1) {
          this.exitFlowArray[Math.floor(keyHour / 2)].YValue += item.road_inside_exit_flow;
        } else if (this.areaType === 2) {
          this.exitFlowArray[Math.floor(keyHour / 2)].YValue += item.road_outside_exit_flow;
        }
      });
      entryFlowByHourList.forEach(item => {
        const keyHour = new Date(item.time_point * 1000).getHours();
        if (this.areaType === 1) {
          this.entryFlowArray[Math.floor(keyHour / 2)].YValue += item.road_inside_entry_flow;
        } else if (this.areaType === 2) {
          this.entryFlowArray[Math.floor(keyHour / 2)].YValue += item.road_outside_entry_flow;
        }
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
    const entryChartXY = EChartHelper.GenerateChartXY(this.entryFlowArray);
    const exitChartXY = EChartHelper.GenerateChartXY(this.exitFlowArray);
    timer(0).subscribe(() => {
      this.chartOptions = {
        legend: {
          icon: 'roundRect',
          right: 0,
          top: 10,
          textStyle: {
            fontSize: 18,
            color: '#A3CAFF'
          },
          itemWidth: 6,
          itemHeight: 6
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            'type': 'line' // 默认为直线，可选为：'line' | 'shadow'
          },
          confine: true, // 是否将 tooltip 框限制在图表的区域内。
          formatter: (params: Array<any>) => {
            let content = `${params[0].dataIndex * 2}-${(params[0].dataIndex + 1) * 2}时`;
            params.forEach((param) => {
              content += `<br/>${param.marker}${param.seriesName}：${param.value}辆`;
            });
            return content;
          }
        },
        calculable: true,
        grid: {
          bottom: 50,
          left: 20,
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            axisLabel: {
              color: '#99BFF3',
              fontWeight: 400,
              fontSize: 18,
              // rotate: -40,
              // interval: 3,
              // showMaxLabel: true,
              // showMinLabel: true
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#1F416C'
              }
            },
            axisTick: {
              show: false
            },
            boundaryGap: false,
            data: ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24'],
          }
        ],
        yAxis: [
          {
            name: '流量(辆)',
            nameTextStyle: {
              color: '#99BFF3',
              fontWeight: 400,
              fontSize: 18,
            },
            type: 'value',
            axisLabel: {
              color: '#99BFF3',
              fontWeight: 400,
              fontSize: 18,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#1F416C'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: ['#1F416C'],
              }
            },
            minInterval: 1,
          }
        ],
        series: [
          {
            name: '出场',
            type: 'line',
            data: exitChartXY.chartY,
            symbol: 'circle',
            itemStyle: {
              color: '#2897FF'
            },
            lineStyle: {
              width: 1,
              color: '#2897FF'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 1, color: 'rgba(40, 151, 255, 0)'},
                  {offset: 0, color: 'rgba(40, 151, 255, .5)'}
                ]
              )
            }
          },
          {
            name: '入场',
            type: 'line',
            data: entryChartXY.chartY,
            symbol: 'circle',
            itemStyle: {
              color: '#FFB543'
            },
            lineStyle: {
              width: 1,
              color: '#FFB543'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 1, color: 'rgba(255,181,67,0)'},
                  {offset: 0, color: 'rgba(255, 181, 67, .5)'}
                ]
              )
            }
          },
        ],
      };
      this.chartInstance && this.chartInstance.setOption(this.chartOptions, true);
    });
  }

  // private generateChart() {
  //   const multiple = this.sourceSize === 'superlg' ? 2 : 1;
  //   const entryChartXY = EChartHelper.GenerateChartXY(this.entryFlowArray);
  //   const exitChartXY = EChartHelper.GenerateChartXY(this.exitFlowArray);
  //
  //   Observable.timer(0).subscribe(() => {
  //     this.chartOptions = {
  //       tooltip: {
  //         trigger: 'axis',
  //         axisPointer: { // 坐标轴指示器，坐标轴触发有效
  //           'type': 'line' // 默认为直线，可选为：'line' | 'shadow'
  //         },
  //         confine: true, // 是否将 tooltip 框限制在图表的区域内。
  //         formatter: (params, ticket, callback) => {
  //           let message = (params[0].axisValue - 2) + '~' + params[0].axisValue + '时';
  //           for (const param of params) {
  //             message += '<br/>' + param.seriesName + '流量' + ' : ' + EChartHelper.FormatFlow(param.data);
  //           }
  //           return message;
  //         }
  //       },
  //       legend: {
  //         data: [
  //           {
  //             name: '出场',
  //             icon: 'circle',
  //             textStyle: {
  //               color: '#fff',
  //               fontSize: 12 * multiple
  //             }
  //           },
  //           {
  //             name: '入场',
  //             icon: 'circle',
  //             textStyle: {
  //               color: '#fff',
  //               fontSize: 12 * multiple
  //             }
  //           }
  //         ],
  //         right: 10 * multiple,
  //         top: 10 * multiple,
  //         itemWidth: 25 * multiple,
  //         itemHeight: 14 * multiple
  //       },
  //       calculable: true,
  //       grid: {
  //         top: 40 * multiple,
  //         bottom: 20 * multiple,
  //         left: 10 * multiple,
  //         containLabel: true,
  //       },
  //       xAxis: [
  //         {
  //           type: 'category',
  //           axisLabel: {
  //             color: '#C8EBFF',
  //             fontSize: multiple * 12,
  //           },
  //           axisLine: {
  //             show: true,
  //             lineStyle: {
  //               color: '#3969F3',
  //               width: multiple * 1
  //             }
  //           },
  //           axisTick: {
  //             show: false
  //           },
  //           splitLine: {
  //             show: false
  //           },
  //           boundaryGap: false,
  //           data: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]
  //         }
  //       ],
  //       yAxis: [
  //         {
  //           type: 'value',
  //           name: '流量(辆)',
  //           nameTextStyle: {
  //             color: '#C8EBFF',
  //             fontSize: multiple * 12,
  //             padding: [0, 0, multiple * 5, 0]
  //           },
  //           axisLabel: {
  //             color: '#C8EBFF',
  //             fontSize: multiple * 12,
  //           },
  //           axisLine: {
  //             show: true,
  //             lineStyle: {
  //               color: '#3969F3',
  //               width: multiple * 1
  //             }
  //           },
  //           axisTick: {
  //             show: false
  //           },
  //           splitLine: {
  //             show: false
  //           },
  //           splitNumber: 3,
  //           minInterval: 1,
  //         }
  //       ],
  //       series: [
  //         {
  //           name: '出场',
  //           type: 'line',
  //           symbol: 'circle',
  //           symbolSize: multiple * 4,
  //           data: exitChartXY.chartY,
  //           lineStyle: {
  //             width: multiple * 2
  //           }
  //         },
  //         {
  //           name: '入场',
  //           type: 'line',
  //           symbol: 'circle',
  //           symbolSize: multiple * 4,
  //           showAllSymbol: true,
  //           data: entryChartXY.chartY,
  //           lineStyle: {
  //             width: multiple * 2
  //           }
  //         }
  //       ],
  //       color: ['#e87724', '#00ffd6']
  //     };
  //     this.chartInstance && this.chartInstance.setOption(this.chartOptions, true);
  //   });
  // }
}
