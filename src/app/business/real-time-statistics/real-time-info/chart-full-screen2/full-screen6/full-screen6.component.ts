import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChartFullScreenService} from '../../chart-full-screen/chart-full-screen.service';

@Component({
  selector: 'app-full-screen6',
  templateUrl: './full-screen6.component.html',
  styleUrls: ['./full-screen6.component.css']
})
export class FullScreen6Component implements OnInit, OnDestroy {

  constructor(private chartFullScreenService: ChartFullScreenService) {
  }

  public ngOnInit() {
    this.chartFullScreenService.startTimer();
  }

  public ngOnDestroy() {
    this.chartFullScreenService.stopTimer();
  }

}
