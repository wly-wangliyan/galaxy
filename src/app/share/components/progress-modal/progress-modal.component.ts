import {Component, ElementRef, ViewChild, Input} from '@angular/core';

@Component({
  selector: 'app-progress-modal',
  templateUrl: './progress-modal.component.html',
  styleUrls: ['./progress-modal.component.css']
})
export class ProgressModalComponent {

  public message = '';
  @ViewChild('progressModal') progressModal: ElementRef;
  @Input()
  public hideCloseButton = false;
  constructor() {
  }

  public openOrClose(flag = true, message?: string) {
    if (flag) {
      this.message = message || '正在导入中...';
      $(this.progressModal.nativeElement).modal('show');
    } else {
      $(this.progressModal.nativeElement).modal('hide');
    }
  }
}
