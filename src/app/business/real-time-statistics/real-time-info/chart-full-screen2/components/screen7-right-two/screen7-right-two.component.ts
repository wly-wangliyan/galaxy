import {Component, OnDestroy, OnInit} from '@angular/core';
import {OutsideFlowEntity} from '../../../../../data-statistics/data-statistics.model';
import {Subscription} from 'rxjs/Subscription';
import {DataStatisticsHttpService} from '../../../../../data-statistics/data-statistics-http.service';
import {DateFormatHelper} from '../../../../../../../utils/date-format-helper';
import {timer} from 'rxjs/observable/timer';

@Component({
  selector: 'app-screen7-right-two',
  templateUrl: './screen7-right-two.component.html',
  styleUrls: ['./screen7-right-two.component.css']
})
export class Screen7RightTwoComponent implements OnInit {

  constructor(private fullScreenHttpService: DataStatisticsHttpService) {
  }

  ngOnInit(): void {
  }

}
