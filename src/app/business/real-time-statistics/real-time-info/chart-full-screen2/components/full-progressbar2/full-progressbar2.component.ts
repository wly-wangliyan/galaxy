import {Component, Input, OnInit} from '@angular/core';
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-full-progressbar2',
  templateUrl: './full-progressbar2.component.html',
  styleUrls: ['./full-progressbar2.component.less']
})
export class FullProgressbar2Component {

  @Input() public title: string;
  @Input() public count: number;
  @Input() public color: string;
  @Input() public total: number;
  @Input() public size: 'lg' | 'superlg' | 'sm' = 'lg';

  public get percent(): string {
    let count = this.count;
    let total = this.total;
    if (isNullOrUndefined(count)) {
      count = 0;
    }
    if (isNullOrUndefined(total)) {
      total = 0;
    }

    if (count === 0 && total === 0) {
      return '0';
    }

    if (count <= total) {
      return (this.count * 100 / this.total).toFixed(2);
    } else {
      return '100';
    }
  }

  /* 阴影css */
  public generateShadow() {
    const multiple = this.size === 'superlg' ? 2 : 1;
    const shadowLength = this.size === 'superlg' ? '20px' : '10px';
    return {
      'box-shadow': `${this.color} ${1 * multiple}px ${1 * multiple}px ${5 * multiple}px`,
      '-moz-box-shadow': `${this.color} ${1 * multiple}px ${1 * multiple}px ${5 * multiple}px`,
      '-webkit-box-shadow': `${this.color} ${1 * multiple}px ${1 * multiple}px ${5 * multiple}px`,
    };
  }

}
