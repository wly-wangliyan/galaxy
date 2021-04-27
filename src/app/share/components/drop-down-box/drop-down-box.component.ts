import {Component, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-drop-down-box',
  templateUrl: './drop-down-box.component.html',
  styleUrls: ['./drop-down-box.component.css']
})
export class DropDownBoxComponent implements OnChanges {

  /* 内容的宽度,需要自己设置 */
  @Input() public contentWidth = 150;

  /* 数据集合,显示根据是否有数据,数据变更需要每次赋新值，不可直接push */
  @Input() public dataList: Array<DropDownItem> = [];

  @Output() public itemSelected = new EventEmitter<DropDownItem>();

  public isPreventDisplay = false; // 标识是否需要阻止显示

  public windowClickBlock = () => {
    this.isPreventDisplay = true;
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['dataList']) {
      this.isPreventDisplay = false; // 数据发生变化时都不阻止显示
      window.addEventListener('click', this.windowClickBlock);
    }
  }

  public onItemClick(data: DropDownItem) {
    this.itemSelected.emit(data);
    this.isPreventDisplay = true;
    window.removeEventListener('click', this.windowClickBlock);
  }
}

/* 数据项需要实现的接口 */
export interface DropDownItem {
  content: string;
}
