import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-full-screen-item',
  templateUrl: './full-screen-item.component.html',
  styleUrls: ['./full-screen-item.component.less']
})
export class FullScreenItemComponent implements OnInit {

  @Input() public width = 540;

  @Input() public height = 414;

  @Input() public zTitle: string;

  @Input() public headerBgType = '1'; // 左1：1；左2-5 ：2；右1-4：3；右5-6：4

  constructor() {
  }

  ngOnInit(): void {
  }

}
