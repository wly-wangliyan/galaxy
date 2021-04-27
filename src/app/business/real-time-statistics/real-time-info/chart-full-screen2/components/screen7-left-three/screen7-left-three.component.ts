import { Component, OnInit } from '@angular/core';
import {DataStatisticsHttpService} from '../../../../../data-statistics/data-statistics-http.service';
import {CapitalSettlementEntity} from '../../../../../data-statistics/data-statistics.model';
import {DateFormatHelper} from '../../../../../../../utils/date-format-helper';
import {timer} from 'rxjs/observable/timer';

@Component({
  selector: 'app-screen7-left-three',
  templateUrl: './screen7-left-three.component.html',
  styleUrls: ['./screen7-left-three.component.less']
})
export class Screen7LeftThreeComponent implements OnInit {

  public chartOptions: any;
  public chartInstance: any;

  public capitalSettleData: CapitalSettlementEntity = new CapitalSettlementEntity();

  public dateList: Array<string> = [];

  constructor(private fullScreenHttpService: DataStatisticsHttpService) {
  }

  ngOnInit(): void {
    this.requestData();
  }

  public onChartInit(chartInstance: any) {
    this.chartInstance = chartInstance;
  }

  private requestData(): void {
    this.fullScreenHttpService.requestCapitalSettlementList().subscribe(result => {
      this.capitalSettleData = result;
      this.dateList = this.generateDateList();
      this.generateChart();
    });
  }

  private generateDateList(): Array<string> {
    const tempList = new Array(7).fill('');
    return tempList.map((item, index) => {
      const dateIndex = 7 - index;
      const date = DateFormatHelper.Ago(dateIndex);
      return DateFormatHelper.Format(date, 'MM-dd');
    });
  }

  private generateChart() {
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
          formatter: (params) => {
            let content = `${params[0].axisValue}`;
            params.forEach((param) => {
              content += `<br/>${param.marker}${param.seriesName}：${param.value}元`;
            });
            return content;
          }
        },
        calculable: true,
        grid: {
          bottom: 40,
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
              rotate: -40,
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
            data: this.dateList,
          }
        ],
        yAxis: [
          {
            name: '金额(元)',
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
            name: '平台',
            type: 'line',
            data: this.capitalSettleData.platform,
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
            name: '系统',
            type: 'line',
            data: this.capitalSettleData.system,
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
                  {offset: 1, color: 'rgba(255, 181, 67, 0)'},
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

}
