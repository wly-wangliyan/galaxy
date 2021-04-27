import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ChartFullScreenService} from '../chart-full-screen.service';

@Component({
  selector: 'app-full-screen1',
  templateUrl: './full-screen1.component.html',
  styleUrls: ['../chart-full-screen.component.css', './full-screen1.component.css'],
  providers: [ChartFullScreenService]
})
export class FullScreen1Component implements OnInit, OnDestroy {

  public entryFlowList;

  constructor(private chartFullScreenService: ChartFullScreenService) {
  }

  public ngOnInit() {
    this.chartFullScreenService.startTimer();
  }

  public ngOnDestroy() {
    this.chartFullScreenService.stopTimer();
  }

}
