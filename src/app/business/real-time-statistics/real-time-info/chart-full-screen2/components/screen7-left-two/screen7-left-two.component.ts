import {Component, OnInit} from '@angular/core';
import {DataStatisticsHttpService} from '../../../../../data-statistics/data-statistics-http.service';
import {DateFormatHelper} from '../../../../../../../utils/date-format-helper';
import {timer} from 'rxjs/observable/timer';

@Component({
  selector: 'app-screen7-left-two',
  templateUrl: './screen7-left-two.component.html',
  styleUrls: ['./screen7-left-two.component.less']
})
export class Screen7LeftTwoComponent implements OnInit {

  public chartOptions: any;
  public chartInstance: any;

  public dataList: Array<number> = [];
  public dateList: Array<string> = [];

  constructor(private fullScreenHttpService: DataStatisticsHttpService) {
  }

  ngOnInit(): void {
    this.requestData();
  }

  public onChartInit(chartInstance: any): void {
    this.chartInstance = chartInstance;
  }

  private requestData(): void {
    this.fullScreenHttpService.requestUserCurveList().subscribe(results => {
      this.dataList = results;
      this.dateList = this.generateDateList();
      this.generateChart();
    });
  }

  private generateDateList(): Array<string> {
    const tempList = new Array(29).fill('');
    return tempList.map((item, index) => {
      const dateIndex = 29 - index;
      const date = DateFormatHelper.Ago(dateIndex);
      return DateFormatHelper.Format(date, 'MM-dd');
    });
  }

  private generateChart() {
    timer(0).subscribe(() => {
      this.chartOptions = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            'type': 'line' // 默认为直线，可选为：'line' | 'shadow'
          },
          confine: true, // 是否将 tooltip 框限制在图表的区域内。
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
              interval: (index: number, value: string) => {
                return (index) % 4 === 0;
              },
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
            data: this.dateList
          }
        ],
        yAxis: [
          {
            name: '用户量',
            min: 150,
            max: 350,
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
            name: '用户量',
            type: 'line',
            data: this.dataList,
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
        ],
      };
      this.chartInstance && this.chartInstance.setOption(this.chartOptions, true);
    });
  }

}
