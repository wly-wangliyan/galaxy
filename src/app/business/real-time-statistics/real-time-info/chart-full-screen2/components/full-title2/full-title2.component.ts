import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-full-title2',
  templateUrl: './full-title2.component.html',
  styleUrls: ['./full-title2.component.less']
})
export class FullTitle2Component {

  @Input() public title: string;
  @Input() public globalSize: 'lg' | 'sm' | 'superlg' = 'lg';

}
