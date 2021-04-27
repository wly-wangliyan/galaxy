import {Component} from '@angular/core';
import {ExamineType, ParkingBeianSearchParams} from '../../beian.model';

@Component({
  selector: 'app-not-pass',
  templateUrl: './not-pass.component.html',
  styleUrls: ['./not-pass.component.css']
})
export class NotPassComponent {

  public searchParams: ParkingBeianSearchParams = new ParkingBeianSearchParams();

  public examineType: ExamineType = ExamineType.notPass; // 审核类型

  constructor() {
    this.searchParams.status = '2';
    this.searchParams.order_by = '-reviewed_time';
  }
}
