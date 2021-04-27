import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-full-border',
  templateUrl: './full-border.component.html',
  styleUrls: ['./full-border.component.less']
})
export class FullBorderComponent {

  @Input() public arrowSize: 'lg' | 'sm' = 'sm';

  @Input() public arrowRadius = false;

  @Input() public globalSize: 'lg' | 'sm' | 'superlg' = 'lg';

}
