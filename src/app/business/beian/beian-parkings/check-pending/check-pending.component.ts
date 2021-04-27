import {Component} from '@angular/core';
import {ExamineType, ParkingBeianSearchParams} from '../../beian.model';

@Component({
  selector: 'app-check-pending',
  templateUrl: './check-pending.component.html',
  styleUrls: ['./check-pending.component.css'],
})
export class CheckPendingComponent {

  public searchParams: ParkingBeianSearchParams = new ParkingBeianSearchParams();

  public examineType: ExamineType = ExamineType.checkPending; // 审核类型

  constructor() {
    this.searchParams.status = '1';
    this.searchParams.order_by = '-created_time';
  }
}
