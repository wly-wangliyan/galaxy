import {Component, OnInit} from '@angular/core';
import {
  ParkingDynamicsInfoEntity,
  ParkingDynamicsInfoParams
} from "../../../../../data-statistics/data-statistics.model";

@Component({
  selector: 'app-screen7-right-five',
  templateUrl: './screen7-right-five.component.html',
  styleUrls: ['./screen7-right-five.component.less']
})
export class Screen7RightFiveComponent implements OnInit {

  public searchParams: ParkingDynamicsInfoParams = new ParkingDynamicsInfoParams();

  constructor() {
  }

  ngOnInit() {
  }

}


