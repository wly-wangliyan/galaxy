import { Component } from '@angular/core';
import {ExamineType, PlatformBeianSearchParams} from '../../beian.model';

@Component({
  selector: 'app-system-not-pass',
  templateUrl: './system-not-pass.component.html',
  styleUrls: ['./system-not-pass.component.css']
})
export class SystemNotPassComponent {

  public searchParams: PlatformBeianSearchParams = new PlatformBeianSearchParams();

  public examineType: ExamineType = ExamineType.notPass; // 审核类型

  constructor() {
    this.searchParams.reviewed_status = [2];
    this.searchParams.order_by = '-reviewed_time';
  }
}
