import { Component, Input, OnDestroy } from '@angular/core';
import { GlobalService } from '../../../../../../core/global.service';
import { DataStatisticsHttpService } from '../../../../../data-statistics/data-statistics-http.service';
import { SearchSelectorService } from '../../../../../../share/components/search-selector/search-selector.service';
import { Observable } from 'rxjs/Observable';
import { ChartFullScreenService } from '../../../chart-full-screen/chart-full-screen.service';
import { Subscription } from 'rxjs/Subscription';
import {
  ParkingDynamicsInfoEntity,
  ParkingDynamicUtilizationRateEntity
} from '../../../../../data-statistics/data-statistics.model';
import { ChartFullScreen2HttpService } from '../../chart-full-screen2-http.service';
import { isNullOrUndefined } from 'util';
import { GlobalConst } from '../../../../../../share/global-const';

@Component({
  selector: 'app-full-parking-utilization-rate2',
  templateUrl: './full-parking-utilization-rate2.component.html',
  styleUrls: ['./full-parking-utilization-rate2.component.less']
})
export class FullParkingUtilizationRate2Component implements OnDestroy {

  @Input() public sourceWidth: string;
  @Input() public sourceHeight: string;
  @Input() public sourceSize: 'lg' | 'sm' | 'superlg' = 'lg';

  @Input() // 区分1：路内或2：路外
  public set areaType(area_type: number) {
    this.fullTitle = area_type === 1 ? '路内泊位利用率' : '路外泊位利用率';
    this._areaType = area_type;
  }

  private _areaType: number;
  public get areaType(): number {
    return this._areaType;
  }

  @Input()
  public set parkingList(parkingList: Array<ParkingDynamicsInfoEntity>) {
    if (isNullOrUndefined(parkingList)) {
      return;
    }
    this._parkingList = parkingList;
    this.requestData();
    this.timerSubscription && this.timerSubscription.unsubscribe();
    this.timerSubscription = this.fullScreenService.timer_1minutes.subscribe(() => {
      this.requestData();
    });
  }

  private _parkingList: Array<ParkingDynamicsInfoEntity>;
  public get parkingList(): Array<ParkingDynamicsInfoEntity> {
    return this._parkingList;
  }

  public chartOptions: any;
  public chartInstance: any;

  public fullTitle: string;

  public dataInfo: ParkingDynamicUtilizationRateEntity = new ParkingDynamicUtilizationRateEntity();

  private timerSubscription: Subscription;
  private dataSubscription: Subscription;

  constructor(private dataStatisticsHttpService: DataStatisticsHttpService,
              private searchSelectorService: SearchSelectorService,
              private chartFullScreen2HttpService: ChartFullScreen2HttpService,
              private globalService: GlobalService,
              private fullScreenService: ChartFullScreenService) {
  }

  public ngOnDestroy() {
    this.timerSubscription && this.timerSubscription.unsubscribe();
    this.dataSubscription && this.dataSubscription.unsubscribe();
  }

  private requestData() {
    this.dataSubscription && this.dataSubscription.unsubscribe();
    const httpList = [];
    httpList.push(this.dataStatisticsHttpService.requestParkingDynamicUtilizationRate(GlobalConst.RegionID, null));

    // this.dataSubscription = Observable.forkJoin(httpList).subscribe((results: Array<any>) => {
    //   this.dataInfo = results[0];
    //   this.generateOutsideData();
    //   this.generateInsideData();
    //   this.generateChart();
    // }, err => {
    //   this.globalService.httpErrorProcess(err);
    // });
    this.dataSubscription = this.chartFullScreen2HttpService.requestAccessParkingStateInfo().subscribe(result => {
      this.dataInfo.outside_total_num = result.operate_outside_space_num;
      this.dataInfo.inside_total_num = result.operate_inside_space_num;
      this.processData();
      this.generateChart();
    }, err => {
      this.globalService.httpErrorProcess(err);
    });
  }

  /* 处理数据 */
  private processData() {
    let outside_used_num = 0, inside_used_num = 0;
    this.parkingList.forEach(park => {
      if (this.areaType === 1 && park.parking.area_type === 1) {
        inside_used_num += park.parking_tmp_num;
      } else if (this.areaType === 2 && park.parking.area_type === 2) {
        outside_used_num += park.parking_tmp_num;
      }
    });
    this.dataInfo.outside_used_num = outside_used_num < this.dataInfo.outside_total_num ? outside_used_num : this.dataInfo.outside_total_num;
    this.dataInfo.inside_used_num = inside_used_num < this.dataInfo.inside_total_num ? inside_used_num : this.dataInfo.inside_total_num;
    this.dataInfo.outside_unused_num = this.dataInfo.outside_total_num - this.dataInfo.outside_used_num;
    this.dataInfo.inside_unused_num = this.dataInfo.inside_total_num - this.dataInfo.inside_used_num;
  }

  private generateUtilizationRate(): any {
    if (this.dataInfo) {
      if (this.areaType === 1) {
        if (this.dataInfo.inside_used_num === 0) {
          return 0;
        } else if (this.dataInfo.inside_total_num === 0) {
          return 100;
        } else {
          return Number((this.dataInfo.inside_used_num > this.dataInfo.inside_total_num ? 100 : (this.dataInfo.inside_used_num * 100 / this.dataInfo.inside_total_num).toFixed(2)));
        }
      } else if (this.areaType === 2) {
        if (this.dataInfo.outside_used_num === 0) {
          return 0;
        } else if (this.dataInfo.outside_total_num === 0) {
          return 100;
        } else {
          return Number((this.dataInfo.outside_used_num > this.dataInfo.outside_total_num ? 100 : (this.dataInfo.outside_used_num * 100 / this.dataInfo.outside_total_num).toFixed(2)));
        }
      }
    }
    return 0;
  }

  private generateChart() {
    Observable.timer(0).subscribe(() => {

      const multiple = this.sourceSize === 'superlg' ? 2 : 1;
      // http://echarts.baidu.com/option.html#series-gauge 文档位置
      // 指定图表的配置项和数据
      this.chartOptions = {
        series: [
          {
            name: '利用率',
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
              formatter: '{style2|利用率:}' + '{style1|{value}%}',
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
            data: [{ value: this.generateUtilizationRate() }]
          }
        ]
      }
        ;
      this.chartInstance && this.chartInstance.setOption(this.chartOptions, true);
    });
  }

  public onChartInit(chartInstance: any) {
    this.chartInstance = chartInstance;
  }

  /** 处理路内利用率数据，以便匹配路内停车泊位运营情况
   * 固定数值 by zack
   * 路内泊位利用率：泊位总数：31893 、 占用小于等于泊位总数、空闲=31893-占用
   */
  private generateInsideData() {
    if (this.areaType === 1) {
      if (this.dataInfo) {
        this.dataInfo.inside_total_num = 31893;
        this.dataInfo.inside_used_num = this.dataInfo.inside_used_num > this.dataInfo.inside_total_num ? 31893 : this.dataInfo.inside_used_num;
        this.dataInfo.inside_unused_num = 31893 - this.dataInfo.inside_used_num;
      }
    }
  }

  private generateOutsideData() {
    if (this.areaType === 2) {
      if (this.dataInfo) {
        this.dataInfo.outside_total_num = 59740;
        this.dataInfo.outside_used_num = this.dataInfo.outside_used_num > this.dataInfo.outside_total_num ? 59740 : this.dataInfo.outside_used_num;
        this.dataInfo.outside_unused_num = 59740 - this.dataInfo.outside_used_num;
      }
    }
  }
}
