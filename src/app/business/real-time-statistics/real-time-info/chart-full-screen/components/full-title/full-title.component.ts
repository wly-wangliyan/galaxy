import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-full-title',
  templateUrl: './full-title.component.html',
  styleUrls: ['./full-title.component.less']
})
export class FullTitleComponent {
  @Input() public title: string;
  @Input() public globalSize: 'lg' | 'sm' | 'superlg' = 'lg';
}
