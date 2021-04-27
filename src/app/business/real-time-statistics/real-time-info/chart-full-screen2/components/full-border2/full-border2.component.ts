import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-full-border2',
  templateUrl: './full-border2.component.html',
  styleUrls: ['./full-border2.component.less']
})
export class FullBorder2Component {

  @Input() public arrowSize: 'lg' | 'sm' = 'sm';

  @Input() public arrowRadius = false;

  @Input() public globalSize: 'lg' | 'sm' | 'superlg' = 'lg';

}
