import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {isNullOrUndefined} from "util";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

/**
 * 同时支持输入选择和下拉框选择
 */

@Component({
  selector: 'app-input-selector',
  templateUrl: './input-selector.component.html',
  styleUrls: ['./input-selector.component.css']
})
export class InputSelectorComponent implements OnInit {

  @Input() public placeholder = '';

  @Input() public idIdentifier: string;

  @Input() public nameIdentifier: string;

  @Input()
  public set dataList(results: Array<any>) {
    if (isNullOrUndefined(results) || results.length === 0) {
      return;
    }
    const tempList = [];
    results.forEach(result => {
      const temp = new SearchItem(result);
      temp.id = result[this.idIdentifier];
      temp.name = result[this.nameIdentifier];
      tempList.push(temp);
    });
    this.sourceDataList = tempList;
    this.searchDataList = tempList;
  }

  @Output() public selectChange = new EventEmitter();

  public sourceDataList: Array<SearchItem> = []; // 元数据

  public searchDataList: Array<SearchItem> = []; // 搜索数据

  public searchValue = '';

  public searchTermStream = new Subject();

  public isShowListClick = false; // 是否点击按钮显示列表

  @ViewChild('searchResultsContainer') private searchResultsContainer: ElementRef;

  constructor(private renderder2: Renderer2) {
  }

  public ngOnInit() {
    this.searchTermStream.debounceTime(500).subscribe(() => {
      // 防止抖动，屏蔽连点查询时的错误效果
      this.processData();
    });
  }

  // 键盘按下的处理(输入框)
  public onKeyUpInput() {
    this.selectChange.emit(null);
    if (isNullOrUndefined(this.searchValue) || this.searchValue === '' || this.searchValue.trim() === '') {
      return;
    }
    this.searchTermStream.next();
  }

  public onSearchDataClick() {
    this.isShowListClick = !this.isShowListClick;
    if (this.isShowListClick) {
      this.searchValue = '';
      this.searchDataList = this.sourceDataList;
      this.showOrCloseList();
    } else {
      this.showOrCloseList(false);
    }
    event.preventDefault();
    event.stopPropagation();
  }

  // 处理数据
  private processData() {
    this.searchDataList = this.sourceDataList.filter(data => data.name.indexOf(this.searchValue.trim()) >= 0);
    this.showOrCloseList();
  }

  // 显示或者关闭列表
  public showOrCloseList(isShow: boolean = true) {
    if (this.searchDataList.length > 0) {
      Observable.timer(350).subscribe(() => {
        this.renderder2.setStyle(this.searchResultsContainer.nativeElement, 'display', isShow ? 'block' : 'none');
      });
    }
  }

  public onSelectDataClick(data: SearchItem) {
    this.searchValue = data.name;
    this.selectChange.emit(data.source);
    this.isShowListClick = false;
    this.showOrCloseList(false);
  }

  public clear() {
    this.searchValue = '';
  }

}

class SearchItem {
  public source: any;
  public id: string;
  public name: string;

  constructor(source: any) {
    this.source = source;
  }
}
