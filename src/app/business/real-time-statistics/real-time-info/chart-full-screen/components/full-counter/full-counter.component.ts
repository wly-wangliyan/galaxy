import {Component, Input} from '@angular/core';
import {NumberToArray} from '../../../../../../../utils/type-conversion';

@Component({
  selector: 'app-full-counter',
  templateUrl: './full-counter.component.html',
  styleUrls: ['./full-counter.component.less']
})
export class FullCounterComponent {

  public totalCount: number;

  @Input() title: string;

  @Input()
  public set count(count: number) {
    this.totalCount = count;
  }

  @Input() public size: 'lg' | 'superlg' | 'sm' = 'lg';
}
