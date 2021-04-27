import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DataStatisticsHttpService} from '../../../../../data-statistics/data-statistics-http.service';
import {timer} from 'rxjs/observable/timer';
import {DateFormatHelper} from '../../../../../../../utils/date-format-helper';
import {RealFlowEntity, RegionEntryFlowByHourEntity} from '../../../../../data-statistics/data-statistics.model';
import {Subscription} from 'rxjs/Subscription';
import {isNullOrUndefined} from 'util';
// import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-screen7-left-four',
  templateUrl: './screen7-left-four.component.html',
  styleUrls: ['./screen7-left-four.component.css']
})
export class Screen7LeftFourComponent implements OnInit {

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

  public ngOnInit() {
  }

  public onChartInit(chartInstance: any) {
    this.chartInstance = chartInstance;
  }

  private generateChart() {
    timer(0).subscribe(() => {

      // http://echarts.baidu.com/option.html#series-gauge 文档位置
      // 指定图表的配置项和数据
      this.chartOptions = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            'type': 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          confine: true, // 是否将 tooltip 框限制在图表的区域内。
          formatter: (params: Array<any>) => {
            let content = `${params[0].dataIndex * 2}-${(params[0].dataIndex + 1) * 2}时`;
            params.forEach((param) => {
              content += `<br/>${param.marker}${param.seriesName}：${param.value}辆`;
            });
            return content;
          }
        },
        grid: {
          bottom: 20,
          left: 20,
          containLabel: true,
        },
        legend: {
          icon: 'roundRect',
          right: 0,
          top: 10,
          itemWidth: 6,
          itemHeight: 6,
          textStyle: {
            fontSize: 18,
            color: '#A3CAFF'
          },
        },
        calculable: true,
        xAxis: [
          {
            offset: 5,
            type: 'category',
            axisLine: {
              show: true,
              lineStyle: {
                color: '#1F416C'
              }
            },
            axisTick: {
              show: false,
              alignWithLabel: true,
            },
            axisLabel: {
              color: '#99BFF3',
              fontSize: 18,
            },
            data: ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24']
          }
        ],
        yAxis: [
          {
            name: '流量(辆)',
            nameTextStyle: {
              color: '#99BFF3',
              fontWeight: 400,
              fontSize: 18,
            },
            type: 'value',
            axisLine: {
              show: true,
              lineStyle: {
                color: '#1F416C'
              }
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: '#99BFF3',
              fontSize: 18,
            },
            splitLine: {
              lineStyle: {
                color: ['#1F416C'],
              }
            },
            splitNumber: 3,
            minInterval: 1,
          }
        ],
        series: [
          // {
          //   barWidth: 4,
          //   name: '全部',
          //   type: 'bar',
          //   barGap: '50%',
          //   data: this.realFlowData.total
          // },
          {
            barWidth: 6,
            name: '路内',
            type: 'bar',
            barGap: '50%',
            data: this.insideFlowList,
          },
          {
            barWidth: 6,
            name: '路外',
            type: 'bar',
            barGap: '50%',
            data: this.outsideFlowList,
          },
        ],
        color: ['#FFB543', '#2897FF']
      };
      this.chartInstance && this.chartInstance.setOption(this.chartOptions, true);
    });
  }

}
