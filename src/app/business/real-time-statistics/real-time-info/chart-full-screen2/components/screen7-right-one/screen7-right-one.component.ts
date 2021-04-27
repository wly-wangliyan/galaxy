import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {InsideFlowEntity, RegionEntryFlowByHourEntity} from '../../../../../data-statistics/data-statistics.model';
import {Subscription} from 'rxjs/Subscription';
import {DataStatisticsHttpService} from '../../../../../data-statistics/data-statistics-http.service';
import {DateFormatHelper} from '../../../../../../../utils/date-format-helper';
import {timer} from 'rxjs/observable/timer';
import {GlobalService} from '../../../../../../core/global.service';
import {ChartFullScreenService} from '../../../chart-full-screen/chart-full-screen.service';
import {NgxEchartsService} from 'ngx-echarts';
import {GlobalConst} from '../../../../../../share/global-const';
import {Observable} from 'rxjs/Observable';
import {EChartHelper} from '../../../../../../../utils/echart-helper';

@Component({
  selector: 'app-screen7-right-one',
  templateUrl: './screen7-right-one.component.html',
  styleUrls: ['./screen7-right-one.component.css']
})
export class Screen7RightOneComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
