import {Component, OnInit} from '@angular/core';
import {DataStatisticsHttpService} from "../../../../data-statistics/data-statistics-http.service";

@Component({
  selector: 'app-full-screen7',
  templateUrl: './full-screen7.component.html',
  styleUrls: ['./full-screen7.component.less']
})
export class FullScreen7Component implements OnInit {

  private map: any;
  public entryFlowList;

  constructor() {
  }

  public ngOnInit() {
  }

}
