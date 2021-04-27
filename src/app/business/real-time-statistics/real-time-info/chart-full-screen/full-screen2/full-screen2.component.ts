import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChartFullScreenService} from '../chart-full-screen.service';

@Component({
  selector: 'app-full-screen2',
  templateUrl: './full-screen2.component.html',
  styleUrls: ['./full-screen2.component.css']
})
export class FullScreen2Component implements OnInit, OnDestroy {

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
