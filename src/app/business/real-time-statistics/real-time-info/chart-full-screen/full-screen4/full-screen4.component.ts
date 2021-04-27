import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChartFullScreenService} from '../chart-full-screen.service';

@Component({
  selector: 'app-full-screen4',
  templateUrl: './full-screen4.component.html',
  styleUrls: ['./full-screen4.component.css'],
})
export class FullScreen4Component implements OnInit, OnDestroy {

  constructor(private chartFullScreenService: ChartFullScreenService) {
  }

  public ngOnInit() {
    this.chartFullScreenService.startTimer();
  }

  public ngOnDestroy() {
    this.chartFullScreenService.stopTimer();
  }

}
