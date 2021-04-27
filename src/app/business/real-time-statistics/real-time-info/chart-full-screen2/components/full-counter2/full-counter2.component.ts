import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-full-counter2',
  templateUrl: './full-counter2.component.html',
  styleUrls: ['./full-counter2.component.less']
})
export class FullCounter2Component {

  public totalCount: number;

  @Input() title: string;

  @Input()
  public set count(count: number) {
    this.totalCount = count;
  }

  @Input() public size: 'lg' | 'superlg' | 'sm' = 'lg';
}
