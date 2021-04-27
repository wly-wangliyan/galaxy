import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {GlobalService} from '../../../../../../core/global.service';
import {Subscription} from 'rxjs/Subscription';
import {DataStatisticsHttpService} from '../../../../../data-statistics/data-statistics-http.service';
import {Observable} from 'rxjs/Observable';
import {SearchSelectorService} from '../../../../../../share/components/search-selector/search-selector.service';
import {ParkingDynamicUtilizationRateEntity} from '../../../../../data-statistics/data-statistics.model';
import {GlobalConst} from '../../../../../../share/global-const';
import {ChartFullScreenService} from '../../chart-full-screen.service';

@Component({
  selector: 'app-full-parking-utilization-rate',
  templateUrl: './full-parking-utilization-rate.component.html',
  styleUrls: ['./full-parking-utilization-rate.component.less']
})
export class FullParkingUtilizationRateComponent implements OnInit, OnDestroy {

  @Input() public sourceWidth: string;
  @Input() public sourceHeight: string;
  @Input() public sourceSize: 'lg' | 'sm' | 'superlg' = 'lg';

  public chartOptions: any;
  public chartInstance: any;

  public dataInfo: ParkingDynamicUtilizationRateEntity;

  private timerSubscription: Subscription;
  private dataSubscription: Subscription;

  constructor(private dataStatisticsHttpService: DataStatisticsHttpService,
              private searchSelectorService: SearchSelectorService,
              private globalService: GlobalService,
              private fullScreenService: ChartFullScreenService) {
  }

  public ngOnInit() {
    this.requestParkingDynamicUtilizationRate(GlobalConst.RegionID);
    this.timerSubscription = this.fullScreenService.timer_5seconds.subscribe(() => {
      this.requestParkingDynamicUtilizationRate(GlobalConst.RegionID);
    });
  }

  public ngOnDestroy() {
    this.timerSubscription && this.timerSubscription.unsubscribe();
    this.dataSubscription && this.dataSubscription.unsubscribe();
  }

  public onChartInit(chartInstance: any) {
    this.chartInstance = chartInstance;
  }

  private generateUtilizationRate(): any {
    if (this.dataInfo) {
      if (this.dataInfo.used_num === 0) {
        return 0;
      } else if (this.dataInfo.total_num === 0) {
        return 100;
      } else {
        return Number((this.dataInfo.used_num > this.dataInfo.total_num ? 100 : (this.dataInfo.used_num * 100 / this.dataInfo.total_num).toFixed(2)));
      }
    }
    return 0;
  }

  private requestParkingDynamicUtilizationRate(region_id: string) {
    this.dataSubscription && this.dataSubscription.unsubscribe();
    this.dataSubscription = this.dataStatisticsHttpService.requestParkingDynamicUtilizationRate(region_id, null).subscribe(data => {
      this.dataInfo = data;
      this.generateChart();
    }, err => {
      this.globalService.httpErrorProcess(err);
    });
  }

  private generateChart() {
    Observable.timer(0).subscribe(() => {

      const multiple = this.sourceSize === 'superlg' ? 2 : 1;
      // http://echarts.baidu.com/option.html#series-gauge 文档位置
      // 指定图表的配置项和数据
      this.chartOptions = {
        series: [
          {
            name: '填充率',
            type: 'gauge',
            radius: '85%',
            splitNumber: 10, // 分割段数，默认为5
            axisLine: {            // 坐标轴线
              show: true,        // 默认显示，属性show控制显示与否
              lineStyle: {       // 属性lineStyle控制线条样式
                color: [
                  [0.2, '#f45c63'], [0.8, '#e87724'], [1, '#56c74e'],
                ],
                width: multiple * 10
              }
            },
            axisTick: {            // 坐标轴小标记
              show: false,        // 属性show控制显示与否，默认不显示
              splitNumber: 5,    // 每份split细分多少段
              length: multiple * 8,         // 属性length控制线长
              lineStyle: {       // 属性lineStyle控制线条样式
                color: '#eee',
                width: multiple * 1,
                type: 'solid'
              }
            },
            splitLine: {           // 分隔线
              show: true,        // 默认显示，属性show控制显示与否
              length: multiple * 10,         // 属性length控制线长
              lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                color: '#fff',
                width: multiple * 1,
                type: 'solid'
              }
            },
            axisLabel: {
              distance: multiple * 10,
              fontSize: multiple * 12,
              // color: '#fff'
            },
            pointer: {
              length: '80%',
              width: multiple * 6,
            },
            detail: {
              show: true,
              backgroundColor: '#091536',
              borderWidth: multiple * 1,
              borderColor: '#10bae3',
              borderRadius: multiple * 25,
              width: multiple * 80,
              height: multiple * 15,
              offsetCenter: [0, '85%'],       // x, y，单位px
              formatter: '{style2|填充率:}' + '{style1|{value}%}',
              color: 'white',
              padding: [multiple * 5, multiple * 10],
              fontSize: multiple * 12,
              rich: {
                style1: {
                  lineHeight: multiple * 15,
                  color: '#c8e9fd',
                  backgroundColor: '#091536',
                  opacity: 0.7,
                  fontSize: multiple * 12,
                },
                style2: {
                  lineHeight: multiple * 15,
                  color: '#fff',
                  backgroundColor: '#091536',
                  opacity: 0.7,
                  fontSize: multiple * 12,
                }
              },
            },
            data: [{value: this.generateUtilizationRate()}]
          }
        ]
      }
      ;
      this.chartInstance && this.chartInstance.setOption(this.chartOptions, true);
    });
  }
}
