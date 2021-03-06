import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {DataStatisticsHttpService} from '../../../data-statistics/data-statistics-http.service';
import {SearchSelectorService} from '../../../../share/components/search-selector/search-selector.service';
import {GlobalService} from '../../../../core/global.service';
import {SearchSelectorType} from '../../../../share/components/search-selector/search-selector.model';
import {ParkingDynamicOnlineRateEntity} from '../../../data-statistics/data-statistics.model';
import {GlobalConst} from '../../../../share/global-const';

@Component({
  selector: 'app-chart-online-state',
  templateUrl: './chart-online-state.component.html',
  styleUrls: ['./chart-online-state.component.css', '../real-time-info.component.css']
})
export class ChartOnlineStateComponent implements OnInit, AfterViewInit, OnDestroy {

  public chartOptions: any;
  public chartInstance: any;

  private searchSubscription: Subscription;
  private dataSubscription: Subscription;

  public dataInfo: ParkingDynamicOnlineRateEntity;

  constructor(private dataStatisticsHttpService: DataStatisticsHttpService, private searchSelectorService: SearchSelectorService, private globalService: GlobalService) {
  }

  public ngOnInit() {
    this.searchSubscription = this.searchSelectorService.selectStateChanged.subscribe(state => {
      if (state.currentType === SearchSelectorType.Park) {
        this.requestParkingDynamicOnlineRate(state.currentValue);
      } else {
        // 只支持按停车场,如果切换到其他则使用设置的特殊值请求
        this.requestParkingDynamicOnlineRate(GlobalConst.RegionID);
      }
    });
  }

  public ngAfterViewInit() {
    this.generateChart();
  }

  public ngOnDestroy() {
    this.searchSubscription && this.searchSubscription.unsubscribe();
    this.dataSubscription && this.dataSubscription.unsubscribe();
  }

  private generateOnlineRate(): any {
    if (this.dataInfo) {
      if (this.dataInfo.online_num === 0) {
        return 0;
      } else if (this.dataInfo.total_num === 0) {
        return 100;
      } else {
        return Number((this.dataInfo.online_num > this.dataInfo.total_num ? 100 : (this.dataInfo.online_num * 100 / this.dataInfo.total_num).toFixed(2)));
      }
    }
    return 0;
  }

  private requestParkingDynamicOnlineRate(region_id: string) {
    this.dataSubscription && this.dataSubscription.unsubscribe();
    this.dataSubscription = this.dataStatisticsHttpService.requestParkingDynamicOnlineRate(region_id).subscribe(data => {
      this.dataInfo = data;
      this.generateChart();
    }, err => {
      this.globalService.httpErrorProcess(err);
    });
  }

  private generateChart() {
    Observable.timer(0).subscribe(() => {

      // http://echarts.baidu.com/option.html#series-gauge 文档位置
      // 指定图表的配置项和数据
      this.chartOptions = {
        series: [
          {
            name: '在线率',
            type: 'gauge',
            splitNumber: 10, // 分割段数，默认为5
            axisLine: {            // 坐标轴线
              show: true,        // 默认显示，属性show控制显示与否
              lineStyle: {       // 属性lineStyle控制线条样式
                color: [[0.2, '#f45c63'], [0.8, '#FFB21C'], [1, '#56c74e']],
                width: 13
              }
            },
            axisTick: {            // 坐标轴小标记
              show: false,        // 属性show控制显示与否，默认不显示
              splitNumber: 5,    // 每份split细分多少段
              length: 8,         // 属性length控制线长
              lineStyle: {       // 属性lineStyle控制线条样式
                color: '#eee',
                width: 1,
                type: 'solid'
              }
            },
            splitLine: {           // 分隔线
              show: true,        // 默认显示，属性show控制显示与否
              length: 15,         // 属性length控制线长
              lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                color: '#ffffff',
                width: 2,
                type: 'solid'
              }
            },
            pointer: {
              length: '80%',
              width: 6,
            },
            detail: {
              show: true,
              width: 80,
              height: 12,
              offsetCenter: [0, '55%'],       // x, y，单位px
              formatter: [
                '{value|{value}%}',
                '{name|在线率}'
              ].join('\n'),
              rich: {
                value: {
                  color: '#333',
                  fontSize: 16,
                  lineHeight: 28
                },
                name: {
                  color: '#666',
                  fontSize: 13
                },
              },
            },
            data: [{value: this.generateOnlineRate()}]
          }
        ]
      };
      this.chartInstance && this.chartInstance.setOption(this.chartOptions, true);
    });
  }

  public onChartInit(chartInstance: any) {
    this.chartInstance = chartInstance;
  }
}
