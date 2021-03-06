import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {GlobalService} from '../../../../../../core/global.service';
import {Subscription} from 'rxjs/Subscription';
import {DataStatisticsHttpService} from '../../../../../data-statistics/data-statistics-http.service';
import {Observable} from 'rxjs/Observable';
import {SearchSelectorService} from '../../../../../../share/components/search-selector/search-selector.service';
import {ParkingDynamicOnlineRateEntity} from '../../../../../data-statistics/data-statistics.model';
import {ChartFullScreenService} from '../../chart-full-screen.service';
import {GlobalConst} from '../../../../../../share/global-const';

@Component({
  selector: 'app-full-online-state',
  templateUrl: './full-online-state.component.html',
  styleUrls: ['./full-online-state.component.less']
})
export class FullOnlineStateComponent implements OnInit, OnDestroy {

  @Input() public sourceWidth: string;
  @Input() public sourceHeight: string;
  @Input() public sourceSize: 'lg' | 'sm' | 'superlg' = 'lg';

  public chartOptions: any;
  public chartInstance: any;

  public dataInfo: ParkingDynamicOnlineRateEntity;

  private timerSubscription: Subscription;
  private dataSubscription: Subscription;

  constructor(private dataStatisticsHttpService: DataStatisticsHttpService,
              private searchSelectorService: SearchSelectorService,
              private globalService: GlobalService,
              private fullScreenService: ChartFullScreenService) {
  }

  public ngOnInit() {
    this.requestParkingDynamicOnlineRate(GlobalConst.RegionID);
    this.timerSubscription = this.fullScreenService.timer_1minutes.subscribe(() => {
      this.requestParkingDynamicOnlineRate(GlobalConst.RegionID);
    });
  }

  public ngOnDestroy() {
    this.timerSubscription && this.timerSubscription.unsubscribe();
    this.dataSubscription && this.dataSubscription.unsubscribe();
  }

  public onChartInit(chartInstance: any) {
    this.chartInstance = chartInstance;
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

      // http://echarts.baidu.com/option.html#series-gauge ????????????
      // ?????????????????????????????????
      this.chartOptions = this.generateChartOptions();
      this.chartInstance && this.chartInstance.setOption(this.chartOptions, true);
    });
  }

  public generateChartOptions() {
    const multiple = this.sourceSize === 'superlg' ? 2 : 1;
    return {
      series: [
        {
          name: '?????????',
          type: 'gauge',
          radius: '85%',
          splitNumber: 10, // ????????????????????????5
          axisLine: {            // ????????????
            show: true,        // ?????????????????????show??????????????????
            lineStyle: {       // ??????lineStyle??????????????????
              color: [
                [0.2, '#f45c63'], [0.8, '#e87724'], [1, '#56c74e']
              ],
              width: multiple * 10
            }
          },
          axisTick: {            // ??????????????????
            show: false,        // ??????show????????????????????????????????????
            splitNumber: 5,    // ??????split???????????????
            length: multiple * 8,         // ??????length????????????
            lineStyle: {       // ??????lineStyle??????????????????
              color: '#eee',
              width: multiple * 1,
              type: 'solid'
            }
          },
          splitLine: {           // ?????????
            show: true,        // ?????????????????????show??????????????????
            length: multiple * 10,         // ??????length????????????
            lineStyle: {       // ??????lineStyle?????????lineStyle?????????????????????
              color: '#fff',
              width: multiple * 1,
              type: 'solid'
            }
          },
          axisLabel: {
            distance: multiple * 10,
            fontSize: multiple * 12
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
            padding: [multiple * 5, multiple * 10],
            offsetCenter: [0, '85%'],       // x, y?????????px
            formatter: '{style2|?????????:}' + '{style1|{value}%}',
            color: 'white',
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
          data: [{value: this.generateOnlineRate()}]
        }
      ]
    };
  }

}
