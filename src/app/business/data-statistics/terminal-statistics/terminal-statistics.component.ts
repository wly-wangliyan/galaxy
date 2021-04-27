import {Component, OnDestroy, OnInit} from '@angular/core';
import {DateFormatHelper} from '../../../../utils/date-format-helper';
import {ChartXYValue, ComputingCycle, EChartColors, EChartHelper} from '../../../../utils/echart-helper';
import {DataStatisticsHttpService} from '../data-statistics-http.service';
import {GlobalService} from '../../../core/global.service';
import {NewUserParams} from '../services/ds-user-http.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-terminal-statistics',
  templateUrl: './terminal-statistics.component.html',
  styleUrls: ['./terminal-statistics.component.css', '../data-statistics.component.css'],
})
export class TerminalStatisticsComponent implements OnInit, OnDestroy {
  public newUserParams = new NewUserParams();

  public lineChartInstance: any;
  public lineChartOptions: any;

  public currentCycle: any = ComputingCycle.week; // 当前周期计算
  public currentPageList = []; // 当前分页的数据

  public weChatUserList: Array<ChartXYValue> = [];

  public startDate: Date;
  public endDate: Date;
  public datePickerDefaultOptions: any = {
    startDate: new Date('2000/01/01'),
    endDate: DateFormatHelper.Today,
    autoclose: true,
    todayBtn: 'linked',
    todayHighlight: true,
    assumeNearbyYear: true,
    format: 'yyyy/mm/dd',
    language: 'zh-CN',
  };

  public dataList: Array<any> = []; // 列表中所有的数据
  public pageCount = 0; // 当前分页数
  public currentPage = 1; // 当前列表的分页
  public tablePageSize = 15; // 显示的分页数据数

  constructor(private dataStatisticsHttpService: DataStatisticsHttpService, private globalService: GlobalService) {
    this.onStatisticsCycleSelectChange(this.currentCycle);
  }

  public ngOnInit() {

    this.requestWechatNewUserCountByDay();
  }

  public requestWechatNewUserCountByDay() {
    this.newUserParams.section = DateFormatHelper.GenerateSection(this.startDate, this.endDate);
    this.dataStatisticsHttpService.user.requestWechatNewUserCountByDay(this.newUserParams).subscribe(data => {
      this.dataList = data;
      this.processData();
    });
  }

  public ngOnDestroy() {
  }

  public onStatisticsCycleSelectChange(currentCycle: any) {
    const value = Number(currentCycle);
    const currentHour = new Date(this.globalService.timeStamp * 1000).getHours();
    if (value === ComputingCycle.week) {
      if (currentHour >= 8) {
        this.endDate = DateFormatHelper.Yesterday;
        this.startDate = DateFormatHelper.Ago(7);
      } else {
        this.endDate = DateFormatHelper.Ago(2);
        this.startDate = DateFormatHelper.Ago(8);
      }
    } else if (value === ComputingCycle.month) {
      if (currentHour >= 8) {
        this.endDate = DateFormatHelper.Yesterday;
        this.startDate = DateFormatHelper.Ago(30);
      } else {
        this.endDate = DateFormatHelper.Ago(2);
        this.startDate = DateFormatHelper.Ago(31);
      }
    }
    // this.currentCycle = parseInt(event.target.value, null);
  }

  public onPageSelected(event: any) {
    this.currentPage = event.pageNum;
    this.currentPageList = this.dataList.slice((this.currentPage - 1) * this.tablePageSize, this.currentPage * this.tablePageSize);
  }

  public onSelectDateButtonClick() {
    const selectTime = (this.endDate.getTime() - this.startDate.getTime()) / 1000 / 60 / 60 / 24;
    if (selectTime >= 30) {
      this.globalService.promptBox.open('单次查询日期的最长跨度为30天');
      return;
    } else {
      this.requestWechatNewUserCountByDay();
    }
  }

  public onDateChange(event: any) {
    this.currentCycle = ComputingCycle.day;

  }

  /**
   * 处理数据
   */
  private processData() {
    if (this.globalService.checkDateValid(this.startDate, this.endDate)) {
      // 输入的时间格式有效
      const currentCycle = this.currentCycle;
      const startDate = this.startDate;
      const endDate = this.endDate;

      const processBlock = (results) => {
        // 初始化数据
        const newUserUpDaysFlow = EChartHelper.GenerateCycleArray(startDate, endDate, ComputingCycle.day);
        const tableList = [];
        // 加工数据
        newUserUpDaysFlow.forEach((XYValue, chartIndex) => {
          for (const index in results) {
            const keyTime = DateFormatHelper.Format(new Date(results[index].time_point * 1000));
            if (XYValue.XValue === keyTime) {
              // 遍历数据源与图表项,将X轴时间显示相等的项的数据进行赋值
              newUserUpDaysFlow[chartIndex].YValue = results[index].wechat_new_user;
              tableList.push(new TableItem(results[index], keyTime));
              return;
            }
          }
          tableList.push(new TableItem(null, XYValue.XValue));
        });
        // 数据赋值
        this.weChatUserList = newUserUpDaysFlow;
        // 初始化列表数据
        this.initTable(tableList);
        // 更新图表
        this.generateLineChart();
      };

      processBlock(this.dataList);
    }
  }

  public onLineChartInit(event: any) {
    this.lineChartInstance = event;
  }

  public generateLineChart() {
    Observable.timer(1).subscribe(() => {
      const series_data = [];
      const cycle = this.currentCycle;
      const chartXY = EChartHelper.GenerateChartXY(this.weChatUserList);
      series_data.push({
        type: 'line',
        data: chartXY.chartY,
      });
      this.lineChartOptions = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            'type': 'line' // 默认为直线，可选为：'line' | 'shadow'
          },
          confine: true, // 是否将 tooltip 框限制在图表的区域内。
          formatter: (params, ticket, callback) => {
            let res = params[0].name;
            params.forEach(param => {
              const weChatNewUserNum = params[0].data;
              res += '<br/>' + '新增用户数 : ' + weChatNewUserNum + '个';
            });
            return res;
          }
        },
        color: EChartColors,
        grid: {  // 直角坐标系内绘图网格
          left: '3%', // 组件离容器左侧的距离
          right: '4%',
          top: '8%',
          bottom: '5%',
          containLabel: true // 是否包含坐标轴的刻度标签
        },
        xAxis: { // x轴
          type: 'category', // 坐标轴类型
          nameGap: 5, // 坐标轴名称与轴线之间的距离
          data: chartXY.chartX, // 类目数据
          name: '时间/天',
          nameTextStyle: {
            color: '#999'
          },
          boundaryGap: false, // 坐标轴名称与轴线之间的距离
          axisTick: {   // 坐标轴刻度相关设置
            show: false,  // 是否显示坐标轴刻度
            alignWithLabel: true,  // 可以保证刻度线和标签对齐 true时有效
          },
          axisLabel: { // 坐标轴刻度标签的相关设置
            color: '#999',
          },
          axisLine: { // 坐标轴轴线相关设置
            show: true,
            lineStyle: {
              color: '#eaeaea'
            }
          },
        },
        yAxis: { // y轴
          type: 'value', // 数值轴
          minInterval: 1, // 保证坐标轴分割刻度显示成整数
          nameTextStyle: {  // 坐标轴名称的文字样式
            color: '#999'
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#eaeaea'
            }
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: '#999',
          },
          splitLine: {
            lineStyle: {
              color: ['#eaeaea'],
              type: 'dashed'
            }
          },
          splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示
            show: true,
            areaStyle: { // 分隔区域的样式设置
              color: ['#f3f7fd', '#fff']
            },
            opacity: 0.5
          }
        },
        series: series_data // 系列列表。每个系列通过 type 决定自己的图表类型
      };
      this.lineChartInstance && this.lineChartInstance.setOption(this.lineChartOptions, true);
    });
  }

  /**
   * 初始化列表
   * @param results 数据
   */
  private initTable(results: Array<TableItem>) {
    this.dataList = results;
    this.currentPage = 1;
    this.currentPageList = this.dataList.slice(0, this.tablePageSize);
    const intPage = Math.floor(this.dataList.length / this.tablePageSize);
    this.pageCount = this.dataList.length % this.tablePageSize === 0 ? intPage : intPage + 1;
  }
}

class TableItem {
  public source: any;
  public date: string; // 格式化好的时间

  constructor(source: any, date: string) {
    this.source = source;
    this.date = date;
  }
}
