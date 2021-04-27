import {Component, OnInit} from '@angular/core';
import {ItemEntity} from '../../../../../data-statistics/data-statistics.model';
import {DataStatisticsHttpService} from '../../../../../data-statistics/data-statistics-http.service';
import {timer} from 'rxjs/observable/timer';

@Component({
  selector: 'app-screen7-right-three',
  templateUrl: './screen7-right-three.component.html',
  styleUrls: ['./screen7-right-three.component.less']
})
export class Screen7RightThreeComponent implements OnInit {

  public chartOptions: any;
  public chartInstance: any;
  private companyDataList: Array<any> = [
    {name: '空闲路段', value: 152, color: '#5F9BFF'},
    {name: '宽松路段', value: 202, color: '#DDFF37'},
    {
      name: '紧张路段', value: 145, color: '#FA394E'
    }];

  constructor() {
  }

  ngOnInit(): void {
    this.generateChart();
  }

  public onChartInit(chartInstance: any) {
    this.chartInstance = chartInstance;
  }

  private generateChart() {
    timer(0).subscribe(() => {
      const tooltipFormatter = (params: any) => {
        return `${params.name}: ${params.value} (${params.percent}%)`;
      };
      const labelFormatter = (params: any) => {
        return `${params.name}\n${params.percent}%`;
        // return `{b}\n{d}`;
      };

      const colors = this.companyDataList.map(data => data.color);
      this.chartOptions = this.generateOptionsOfPie(
        '路内路段泊位状态',
        this.companyDataList, tooltipFormatter, labelFormatter, colors
      );
    });
  }

  // 饼状图数据源
  public generateOptionsOfPie(
    name: any,
    chartData: Array<any>,
    tooltipFormatter: any,
    labelFormatter: any,
    colors: Array<string>,
    sourceSize: 'superlg' | 'lg' | 'sm' = 'sm') {
    const multiple = sourceSize === 'superlg' ? 2 : 1;

    return {
      tooltip: {
        trigger: 'item',
        formatter: tooltipFormatter
      },
      legend: {
        show: false
      },
      series: [
        {
          name,
          // emphasis: {
          //   scaleSize: 0.5,
          // },
          hoverAnimation: false,
          type: 'pie',
          radius: [0, 119],
          center: ['50%', '50%'],
          data: chartData,
          label: {
            show: true,
            formatter: '{b|{b}}\n{c|{c}}',
            overflow: 'break',
            rich: {
              b: {
                fontSize: 18,
                fontWeight: 'bold',
                lineHeight: 25
              },
              c: {
                color: '#FFFFFF',
                fontSize: 28,
                fontWeight: 'bold',
              },
              // e: {
              //   color: '#FFFFFF',
              //   fontSize: 14,
              //   fontWeight: 'bold',
              // },
            }
          },
          labelLine: {
            show: true,
            length: multiple * 10,
            length2: multiple * 30,
            color: '#fff',
            lineStyle: {
              color: '#4DC2FF'
            }
          },
        }
      ],
      color: colors
    };
  }
}
