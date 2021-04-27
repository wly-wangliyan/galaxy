import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {timer} from 'rxjs/observable/timer';
import {ItemEntity} from '../../../../../data-statistics/data-statistics.model';

@Component({
  selector: 'app-content-hover',
  templateUrl: './content-hover.component.html',
  styleUrls: ['./content-hover.component.less']
})
export class ContentHoverComponent implements OnInit, AfterViewInit {
  public title = '';
  public dataList: Array<ItemEntity> = [];
  public displayItem: any;
  public zLeft = 0;

  @ViewChild('contentContainer') contentDiv: ElementRef;

  constructor(private el: ElementRef, private renderer2: Renderer2
  ) {
  }

  ngAfterViewInit() {
    timer(0).subscribe(() => {
      this.renderer2.addClass(this.contentDiv.nativeElement, 'move-animation');
    });
  }

  ngOnInit() {
  }

}
