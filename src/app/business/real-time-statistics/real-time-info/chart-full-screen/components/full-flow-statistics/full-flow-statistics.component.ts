import {Component, Input} from '@angular/core';
import {RegionEntryFlowByHourEntity} from '../../../../../data-statistics/data-statistics.model';
import {isNullOrUndefined} from 'util';
import {Observable} from 'rxjs/Observable';
import {EChartHelper} from '../../../../../../../utils/echart-helper';

@Component({
  selector: 'app-full-flow-statistics',
  templateUrl: './full-flow-statistics.component.html',
  styleUrls: ['./full-flow-statistics.component.css']
})
export class FullFlowStatisticsComponent {

  public chartOptions: any;
  public chartInstance: any;

  private insideFlowList: Array<number> = new Array(12).fill(0);
  private outsideFlowList: Array<number> = new Array(12).fill(0);
  private totalFlowList: Array<number> = new Array(12).fill(0);

  @Input() public sourceWidth: string;
  @Input() public sourceHeight: string;
  @Input() public sourceSize: 'lg' | 'sm' = 'lg';

  @Input()
  public set entryFlowList(results: Array<RegionEntryFlowByHourEntity>) {
    if (!isNullOrUndefined(results)) {
      const tempInsideFlowList = new Array(12).fill(0);
      const tempOutsideFlowList = new Array(12).fill(0);
      const tempTotalFlowList = new Array(12).fill(0);

      results.forEach(item => {
        const keyHour = new Date(item.time_point * 1000).getHours();
        tempInsideFlowList[Math.floor(keyHour / 2)] += item.road_inside_entry_flow;
        tempOutsideFlowList[Math.floor(keyHour / 2)] += item.road_outside_entry_flow;
        tempTotalFlowList[Math.floor(keyHour / 2)] += item.total_entry_flow;
      });
      this.insideFlowList = tempInsideFlowList;
      this.outsideFlowList = tempOutsideFlowList;
      this.totalFlowList = tempTotalFlowList;
      this.generateChart();
    }
  }

  private generateChart() {
    Observable.timer(0).subscribe(() => {

      // http://echarts.baidu.com/option.html#series-gauge 文档位置
      // 指定图表的配置项和数据
      this.chartOptions = {
        title: {
          subtext: '流量(辆)',
          subtextStyle: {
            color: '#c8e9fd',
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            'type': 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          confine: true, // 是否将 tooltip 框限制在图表的区域内。
          formatter: (params, ticket, callback) => {
            let message = (params[0].axisValue - 2) + '~' + params[0].axisValue + '时';
            for (const param of params) {
              message += '<br/>' + param.seriesName + '流量' + ' : ' + EChartHelper.FormatFlow(param.data);
            }
            setTimeout(() => {
              callback(ticket, message);
            }, 0);
            return message;
          }
        },
        grid: {
          bottom: 20,
          left: 10,
          containLabel: true,
        },
        legend: {
          data: [
            {
              name: '全部',
              icon: 'circle',
              textStyle: {
                color: '#fff'
              }
            },
            {
              name: '路外',
              icon: 'circle',
              textStyle: {
                color: '#fff'
              }
            },

            {
              name: '路内',
              icon: 'circle',
              textStyle: {
                color: '#fff'
              }
            },
          ],
          right: 10,
          top: 10,
        },
        calculable: true,
        xAxis: [
          {
            offset: 5,
            type: 'category',
            axisLine: {
              show: true,
              lineStyle: {
                color: '#2283e3'
              }
            },
            axisTick: {
              show: false,
              alignWithLabel: true,
            },
            axisLabel: {
              color: '#c8e9fd',
            },
            data: ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24']
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              show: true,
              lineStyle: {
                color: '#2283e3'
              }
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: '#c8e9fd',
            },
            splitLine: {
              show: false
            },
            splitNumber: 3,
            minInterval: 1,
          }
        ],
        series: [
          {
            itemStyle: {
              barBorderRadius: 5,
              color: '#f45c63',
            },
            barWidth: 6,
            name: '全部',
            type: 'bar',
            data: this.totalFlowList,
          },
          {
            itemStyle: {
              barBorderRadius: 5,
              color: '#FFB21C',
            },
            barWidth: 6,
            name: '路外',
            type: 'bar',
            data: this.outsideFlowList,
          },

          {
            itemStyle: {
              barBorderRadius: 5,
              color: '#56c74e',
            },
            barWidth: 6,
            name: '路内',
            type: 'bar',
            data: this.insideFlowList,
          },
        ],
        color: ['#f45c63', '#FFB21C', '#56c74e']
      };
      this.chartInstance && this.chartInstance.setOption(this.chartOptions, true);
    });
  }

  public onChartInit(chartInstance: any) {
    this.chartInstance = chartInstance;
  }

}
