import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-show-full-screen',
  templateUrl: './show-full-screen.component.html',
  styleUrls: ['./show-full-screen.component.css']
})
export class ShowFullScreenComponent {

  @ViewChild('fullScreenContainer') public fullScreenContainer: ElementRef;

  public isFullScreen = false;
  public isAllScreen = true; // 是否显示全部屏幕

}
