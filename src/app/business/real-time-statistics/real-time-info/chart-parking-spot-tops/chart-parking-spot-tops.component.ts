import {Component, AfterViewInit, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {EChartSeriesDataItem} from '../../../../share/echart-data';
import {DataStatisticsHttpService} from '../../../data-statistics/data-statistics-http.service';
import {SearchSelectorService} from '../../../../share/components/search-selector/search-selector.service';
import {GlobalService} from '../../../../core/global.service';
import {SearchSelectorType} from '../../../../share/components/search-selector/search-selector.model';
import {
  ParkingRealTimeStatisticsParams,
  ParkingRealTimeStatisticsEntity, GroupRealTimeStatisticsEntity, RegionRealTimeStatisticsEntity,
  GroupRealTimeStatisticsParams, RegionRealTimeStatisticsParams
} from '../../../data-statistics/data-statistics.model';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-chart-parking-spot-tops',
  templateUrl: './chart-parking-spot-tops.component.html',
  styleUrls: ['./chart-parking-spot-tops.component.css', '../real-time-info.component.css']
})
export class ChartParkingSpotTopsComponent implements OnInit, AfterViewInit, OnDestroy {
  public chartOptions: any;
  public chartInstance: any;

  private searchSubscription: Subscription;
  private dataSubscription: Subscription;

  private topList: Array<FillingRateSeriesDataItem> = [];

  constructor(private dataStatisticsHttpService: DataStatisticsHttpService, private searchSelectorService: SearchSelectorService, private globalService: GlobalService) {
  }

  public ngOnInit() {
    this.searchSubscription = this.searchSelectorService.selectStateChanged.subscribe(state => {
      switch (state.currentType) {
        case SearchSelectorType.Park:
          const parkingParams = new ParkingRealTimeStatisticsParams('-filling_rate');
          parkingParams.region_id = state.currentValue;
          this.dataSubscription && this.dataSubscription.unsubscribe();
          this.dataSubscription = this.dataStatisticsHttpService.requestParkingRealTimeStatisticsList(parkingParams).subscribe(data => {
            this.processHttpData(data.results);
          }, err => {
            this.globalService.httpErrorProcess(err);
          });
          break;
        case SearchSelectorType.Group:
          const groupParams = new GroupRealTimeStatisticsParams('-filling_rate');
          this.dataSubscription && this.dataSubscription.unsubscribe();
          this.dataSubscription = this.dataStatisticsHttpService.requestGroupRealTimeStatisticsList(groupParams).subscribe(data => {
            this.processHttpData(data.results);
          }, err => {
            this.globalService.httpErrorProcess(err);
          });
          break;
        case SearchSelectorType.Region:
          const regionParams = new RegionRealTimeStatisticsParams('-filling_rate');
          this.dataSubscription && this.dataSubscription.unsubscribe();
          this.dataSubscription = this.dataStatisticsHttpService.requestRegionRealTimeStatisticsList(regionParams).subscribe(data => {
            this.processHttpData(data.results);
          }, err => {
            this.globalService.httpErrorProcess(err);
          });
          break;
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

  /* 处理从服务器请求下来数据 */
  private processHttpData(results: Array<any>) {
    const tempList = new Array(5).fill(new FillingRateSeriesDataItem(null));
    results.forEach((entity, index) => {
      tempList[index] = new FillingRateSeriesDataItem(entity);
    });
    this.topList = tempList.reverse();
    this.generateChart();
  }

  private generateChart() {
    Observable.timer(0).subscribe(() => {

      // http://echarts.baidu.com/option.html#series-gauge 文档位置
      // 指定图表的配置项和数据
      this.chartOptions = {
        'tooltip': {
          'trigger': 'axis',
          'axisPointer': { // 坐标轴指示器，坐标轴触发有效
            'type': 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          'confine': true,
          'formatter': function (params, ticket, callback) {

            let message = '';
            switch (params[0].dataIndex) {
              case 4:
                message = '排名第一';
                break;
              case 3:
                message = '排名第二';
                break;
              case 2:
                message = '排名第三';
                break;
              case 1:
                message = '排名第四';
                break;
              case 0:
                message = '排名第五';
                break;
            }
            if (params[0].data.source) {
              message += '<br/>' + params[0].data.titleName;
              message += '<br/>' + '车位利用率' + ' : ' + params[0].data.name;
            }
            // setTimeout(() => {
            //   callback(ticket, message);
            // }, 0);
            return message;
          }
        },
        'grid': {
          'top': 0,
          'left': '3%',
          'right': '10%',
          'bottom': '3%',
          'containLabel': true
        },
        'yAxis': [{
          'type': 'category',
          'data': ['TOP5', 'TOP4', 'TOP3', 'TOP2', 'TOP1'],
          'axisLine': {
            'show': false
          },
          'axisTick': {
            'show': false,
            'alignWithLabel': true
          },
          'axisLabel': {
            'color': (value, index) => {
              return this.getColor(index);
            },
            'fontFamily': 'Microsoft YaHei',
            'fontWeight': 'bold',
          }
        }],
        'xAxis': [{
          'type': 'value',
          'axisLine': {
            'show': false
          },
          'axisTick': {
            'show': false
          },
          'axisLabel': {
            'show': false
          },
          'splitLine': {
            'show': false
          }
        }],

        'series': [{
          'name': '车位利用率',
          'type': 'bar',
          'data': this.topList,
          'barCategoryGap': '35%',
          'barWidth': 20,
          'label': {
            'normal': {
              'show': true,
              'position': 'right',
              'formatter': (params) => {
                return params.data.name;
              },
              'textStyle': {
                'color': '#000000' // color of value
              }
            }
          },
          'itemStyle': {
            'normal': {
              'color': data => {
                return this.getColor(data.dataIndex);
              }
            }
          }
        }]
      };
      this.chartInstance && this.chartInstance.setOption(this.chartOptions, true);
    });
  }

  /* 获取颜色 */
  private getColor(index: number): string {
    if (index === 4) {
      return '#f05c57';
    } else if (index === 3) {
      return '#f57064';
    } else if (index === 2) {
      return '#fe9e81';
    } else if (index === 1) {
      return '#ffac93';
    } else if (index === 0) {
      return '#ffbfa9';
    }
  }

  public onChartInit(chartInstance: any) {
    this.chartInstance = chartInstance;
  }
}

class FillingRateSeriesDataItem extends EChartSeriesDataItem {

  public source: any;

  public titleName: string;

  constructor(source: any) {
    super();
    this.source = source;
    if (isNullOrUndefined(source)) {
      this.titleName = '';
      this.value = '';
      this.name = '';
      return;
    }

    if (source instanceof ParkingRealTimeStatisticsEntity) {
      const parkingSource = <ParkingRealTimeStatisticsEntity>source;
      this.titleName = '停车场 : ' + parkingSource.parking.parking_name;
      this.value = parkingSource.filling_rate;
      this.name = Number((this.value * 100).toFixed(2)) + '%';
    } else if (source instanceof GroupRealTimeStatisticsEntity) {
      const groupSource = <GroupRealTimeStatisticsEntity>source;
      this.titleName = '分组 : ' + groupSource.parking_group.parking_group_name;
      this.value = groupSource.filling_rate;
      this.name = Number((this.value * 100).toFixed(2)) + '%';
    } else if (source instanceof RegionRealTimeStatisticsEntity) {
      const regionSource = <RegionRealTimeStatisticsEntity>source;
      this.titleName = '行政 : ' + regionSource.region.name;
      this.value = regionSource.filling_rate;
      this.name = Number((this.value * 100).toFixed(2)) + '%';
    }

    // 根据实际布局情况调整文本长度
    if (this.titleName.length > 33) {
      const line1 = this.titleName.slice(0, 33);
      const line2 = this.titleName.slice(33, 66);
      this.titleName = line1 + '<br>' + line2;
    }
  }
}

