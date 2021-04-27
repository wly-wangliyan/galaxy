import {Component, ElementRef, ViewChild} from '@angular/core';
import {ChartFullScreenService} from './chart-full-screen.service';

@Component({
  selector: 'app-chart-full-screen',
  templateUrl: './chart-full-screen.component.html',
  styleUrls: ['../real-time-info.component.css', './chart-full-screen.component.css'],
  providers: [ChartFullScreenService]
})
export class ChartFullScreenComponent {

  @ViewChild('fullScreenContainer') public fullScreenContainer: ElementRef;

  public selectFullScreenNumber = 0;

  public onfullScreenSelect(event: any) {
    this.selectFullScreenNumber = event;
  }

}
