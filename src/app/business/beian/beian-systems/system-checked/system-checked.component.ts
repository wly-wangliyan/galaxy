import {Component} from '@angular/core';
import {ExamineType, PlatformBeianSearchParams} from '../../beian.model';

@Component({
  selector: 'app-system-checked',
  templateUrl: './system-checked.component.html',
  styleUrls: ['./system-checked.component.css']
})
export class SystemCheckedComponent {

  public searchParams: PlatformBeianSearchParams = new PlatformBeianSearchParams();

  public examineType: ExamineType = ExamineType.checked; // 审核类型

  constructor() {
    this.searchParams.reviewed_status = [4];
    this.searchParams.order_by = '-reviewed_time';
  }
}
