import {Component} from '@angular/core';
import {ExamineType, PlatformBeianSearchParams} from '../../beian.model';

@Component({
  selector: 'app-system-check-pending',
  templateUrl: './system-check-pending.component.html',
  styleUrls: ['./system-check-pending.component.css']
})
export class SystemCheckPendingComponent {

  public searchParams: PlatformBeianSearchParams = new PlatformBeianSearchParams();

  public examineType: ExamineType = ExamineType.checkPending; // 审核类型

  constructor() {
    this.searchParams.reviewed_status = [1];
    this.searchParams.order_by = '-created_time';
  }
}
