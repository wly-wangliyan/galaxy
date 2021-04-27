import {Component, OnInit} from '@angular/core';
import {ItemEntity} from '../../../../../data-statistics/data-statistics.model';
import {DataStatisticsHttpService} from '../../../../../data-statistics/data-statistics-http.service';
import {timer} from 'rxjs/observable/timer';
import {Subscription} from 'rxjs/Subscription';
import {LengenItem} from '../../../chart-user-type-ratio/chart-user-type-ratio.component';
import {SearchSelectorService} from '../../../../../../share/components/search-selector/search-selector.service';
import {GlobalService} from '../../../../../../core/global.service';
import {ChartFullScreenService} from '../../../chart-full-screen/chart-full-screen.service';
import {GlobalConst} from '../../../../../../share/global-const';
import {Observable} from 'rxjs/Observable';
import {UserTypeDataItem} from '../../../chart-full-screen/components/full-user-type-ratio/full-user-type-ratio.component';
import {isNullOrUndefined} from 'util';

const userTypeObj = {
  tmp: '临时',
  white: '白名单',
  timely: '包时',
  count: '包次',
  visitor: '访客',
  reservation: '预约',
  space_sharing: '共享',
  other: '其他',
};

@Component({
  selector: 'app-screen7-left-five',
  templateUrl: './screen7-left-five.component.html',
  styleUrls: ['./screen7-left-five.component.less']
})
export class Screen7LeftFiveComponent implements OnInit {

  public chartOptions: any;
  public chartInstance: any;

  public userTypeDataList: Array<UserTypeDataItem>;
  private percentObj: any;

  private timerSubscription: Subscription;
  private dataSubscription: Subscription;
  private legendList: Array<LengenItem> = []; // 图例列表

  constructor(private dataStatisticsHttpService: DataStatisticsHttpService,
              private searchSelectorService: SearchSelectorService,
              private globalService: GlobalService,
              private fullScreenService: ChartFullScreenService) {
  }

  public ngOnInit() {
    this.requestAllData();
    this.timerSubscription = this.fullScreenService.timer_1minutes.subscribe(() => {
      this.requestAllData();
    });
  }

  public ngOnDestroy() {
    this.timerSubscription && this.timerSubscription.unsubscribe();
    this.dataSubscription && this.dataSubscription.unsubscribe();
  }

  public onChartInit(chartInstance: any) {
    this.chartInstance = chartInstance;
  }

  private requestAllData() {
    this.dataSubscription && this.dataSubscription.unsubscribe();
    this.dataSubscription = this.dataStatisticsHttpService.requestRegionStatisticsUserTypeList(GlobalConst.RegionID).subscribe(
      result => {
        const userTypeDataList = [];
        for (const item in result) {
          if (result.hasOwnProperty(item)) {
            if (userTypeObj[item]) {
              userTypeDataList.push(new UserTypeDataItem(userTypeObj[item], item, result[item]));
            }
          }
        }
        this.percentObj = this.caculatePercent(userTypeDataList);
        this.userTypeDataList = userTypeDataList;
        this.sort();
        this.userTypeDataList.reverse();
        this.generateChart();
      }, err => {
        this.globalService.httpErrorProcess(err);
      });
  }

  private generateChart() {
    this.legendList = [];
    this.userTypeDataList.forEach(userType => {
      this.legendList.push(new LengenItem(userType.name));
    });
    Observable.timer(0).subscribe(() => {
      this.chartOptions = this.generateChartOptions();
    });
  }
  private generateChartOptions() {

      return  {
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b} {c}%',
        },
        legend: {
          orient: 'vertical',
          right: 69,
          top: 78,
          padding: [0, 10, 0, 0],
          itemWidth: 8,
          itemHeight: 8,
          textStyle: {
            fontSize: 18,
            color: '#A3CAFF'
          },
          formatter: (name: string) => {
            // const item = this.userTypeDataList.find(data => data.name === name);
            return this.percentObj[name] + '% ' + name;
          }
        },
        series: [
          {
            name: '车辆类型',
            type: 'pie',
            radius: 119,
            center: ['28.5%', '52%'],
            data: this.userTypeDataList,
            emphasis: {
              scale: false,
              scaleSize: 3
            },
            animation: false,
            label: {
              normal: {
                show: false,
              }
            },
            labelLine: {
              show: false,
            }
          }
        ],
        color: ['#346CFF', '#3489FE', '#33C9FE', '#33FFCE', '#33FF84', '#DDFF37', '#FFAF32', '#FA394E']
      };

  }

  private caculatePercent(userTypeDataList: Array<UserTypeDataItem>) {
    let totalUserTypeValue = 0;  // 数量总值
    let maxUserTypeItem = null; // 最大值项
    let totalPercent = 0; // 除最大项外的累计百分比
    const percentObj = {};
    // 计算总值 和找出最大值
    userTypeDataList.forEach(userTypeItem => {
      totalUserTypeValue += userTypeItem.value;
      if (isNullOrUndefined(maxUserTypeItem)) {
        maxUserTypeItem = userTypeItem;
      } else {
        if (userTypeItem.value > maxUserTypeItem.value) {
          maxUserTypeItem = userTypeItem;
        }
      }
    });

    // 最大值为0时全部为0
    if (maxUserTypeItem.value === 0) {
      userTypeDataList.forEach(userItem => {
        percentObj[userItem.name] = 0;
      });
    } else {
      userTypeDataList.forEach(userItem => {
        if (userItem.english_name !== maxUserTypeItem.english_name) {
          // 计算除最大型以外的百分比
          const _percent = userItem.value / totalUserTypeValue * 100;
          let percent = 0;
          if (userItem.value > 0) {
            percent = _percent < 0.001 ? 0.001 : Math.round(_percent * 1000) / 1000;
          }
          totalPercent += percent;
          percentObj[userItem.name] = percent;
        }
      });
      percentObj[maxUserTypeItem.name] = Math.round((100 - totalPercent) * 1000) / 1000;
    }
    for (const obj in percentObj) {
      percentObj[obj] = percentObj[obj].toFixed(3);
    }
    return percentObj;
  }

  // 排序
  private sort() {
    for (let j = 0; j < this.userTypeDataList.length - 1; j++) {
      // 两两比较，如果前一个比后一个大，则交换位置。
      for (let i = 0; i < this.userTypeDataList.length - 1 - j; i++) {
        if (this.userTypeDataList[i].value > this.userTypeDataList[i + 1].value) {
          const temp = this.userTypeDataList[i];
          this.userTypeDataList[i] = this.userTypeDataList[i + 1];
          this.userTypeDataList[i + 1] = temp;
        }
      }
    }
  }

  // private generateChart() {
  //   timer(0).subscribe(() => {
  //     this.chartOptions = {
  //       tooltip: {
  //         trigger: 'item',
  //         formatter: '{a}<br/>{b} {c}%',
  //       },
  //       legend: {
  //         orient: 'vertical',
  //         right: 69,
  //         top: 78,
  //         padding: [0, 10, 0, 0],
  //         itemWidth: 8,
  //         itemHeight: 8,
  //         textStyle: {
  //           fontSize: 18,
  //           color: '#A3CAFF'
  //         },
  //         formatter: (name: string) => {
  //           const item = this.dataList.find(data => data.name === name);
  //           return `${item.value}% ${name}`;
  //         }
  //       },
  //       series: [
  //         {
  //           name: '车辆类型',
  //           type: 'pie',
  //           radius: 119,
  //           center: ['28.5%', '52%'],
  //           data: this.dataList,
  //           emphasis: {
  //             scale: false,
  //             scaleSize: 3
  //           },
  //           animation: false,
  //           label: {
  //             normal: {
  //               show: false,
  //             }
  //           },
  //           labelLine: {
  //             show: false,
  //           }
  //         }
  //       ],
  //       color: ['#346CFF', '#3489FE', '#33C9FE', '#33FFCE', '#33FF84', '#DDFF37', '#FFAF32', '#FA394E']
  //     };
  //   });
  // }

}
