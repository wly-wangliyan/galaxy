import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChartFullScreenService} from '../../chart-full-screen/chart-full-screen.service';

@Component({
  selector: 'app-full-screen5',
  templateUrl: './full-screen5.component.html',
  styleUrls: ['./full-screen5.component.css']
})
export class FullScreen5Component implements OnInit, OnDestroy {

  public parkingList: Array<any>;

  constructor(private chartFullScreenService: ChartFullScreenService) {
  }

  public ngOnInit() {
    this.chartFullScreenService.startTimer();
  }

  public ngOnDestroy() {
    this.chartFullScreenService.stopTimer();
  }

}
