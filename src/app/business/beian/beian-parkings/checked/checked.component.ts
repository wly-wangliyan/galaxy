import {Component} from '@angular/core';
import {ExamineType, ParkingBeianSearchParams} from '../../beian.model';

@Component({
  selector: 'app-checked',
  templateUrl: './checked.component.html',
  styleUrls: ['./checked.component.css']
})
export class CheckedComponent {

  public searchParams: ParkingBeianSearchParams = new ParkingBeianSearchParams();

  public examineType: ExamineType = ExamineType.checked; // 审核类型

  constructor() {
    this.searchParams.status = '4,5,6';
    this.searchParams.order_by = '-reviewed_time';
  }
}
