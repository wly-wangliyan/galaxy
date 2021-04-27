import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChartFullScreenService} from '../chart-full-screen.service';

@Component({
  selector: 'app-full-screen3',
  templateUrl: './full-screen3.component.html',
  styleUrls: ['./full-screen3.component.css']
})
export class FullScreen3Component implements OnInit, OnDestroy {

  constructor(private chartFullScreenService: ChartFullScreenService) {
  }

  public ngOnInit() {
    this.chartFullScreenService.startTimer();
  }

  public ngOnDestroy() {
    this.chartFullScreenService.stopTimer();
  }

}
