import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {
  ParkingDynamicsInfoEntity,
  ParkingDynamicsInfoParams
} from '../../../../../data-statistics/data-statistics.model';
import {Observable} from 'rxjs/Observable';
import {DataStatisticsHttpService} from '../../../../../data-statistics/data-statistics-http.service';
import {GlobalService} from '../../../../../../core/global.service';
import {GlobalConst} from '../../../../../../share/global-const';

@Component({
  selector: 'app-full-monitor',
  templateUrl: './full-monitor.component.html',
  styleUrls: ['./full-monitor.component.css']
})
export class FullMonitorComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() public sourceWidth: string;
  @Input() public sourceHeight: string;
  @Input() public sourceSize: 'lg' | 'sm' = 'lg';

  public dataList: Array<RollDataItem> = [];
  private scrollSubscription: Subscription;
  private delaySubscription: Subscription;
  private searchSubscription: Subscription;
  private dataSubscription: Subscription;
  private scrollItemHeight = 40; // 项高度
  private preLoadingHeight = 40 * 15; // 预加载高度 当距离底部还有10条数据时就开始加载 40 * 10 + 40 * 5
  private isPauseScroll = false; // 是否暂停滚动
  private isStopScroll = true; // 是否停止滚动
  private isAppendDataOperation = false; // 是否在追加数据操作中

  public searchParams: ParkingDynamicsInfoParams = new ParkingDynamicsInfoParams();

  public isSimplePermission: Boolean = false; // 是否为简易权限

  @ViewChild('scrollDiv') private scrollDiv: ElementRef;

  constructor(private dataStatisticsHttpService: DataStatisticsHttpService,
              private globalService: GlobalService) {
  }

  private get maxListCount(): number { // 列表中在不滚动时最多显示数
    return this.sourceSize === 'lg' ? 5 : 4;
  }

  public ngOnInit() {
    this.searchParams.region_id = GlobalConst.RegionID;
    this.searchParams.page_num = 1;
    this.searchParams.page_size = GlobalConst.PageSize;
    this.dataSubscription && this.dataSubscription.unsubscribe();
    this.dataSubscription = this.dataStatisticsHttpService.requestParkingDynamicInfoList(this.searchParams).subscribe(data => {
      // 制作首屏数据
      let tempList = [];
      data.results.forEach(res => {
        if (res.status > 0 && res.run_status !== 2) {
          tempList.push(res);
          if (res.tmp_num == '*') {
            this.isSimplePermission = true;
          }
        }
      });
      // let tempList = data.results;
      if (tempList.length > this.maxListCount) {
        // 只有数据超过一屏才需要滚动显示
        if (tempList.length < GlobalConst.PageSize) {
          while (tempList.length < GlobalConst.PageSize) {
            // 数据不足一页则复制自身扩充
            tempList = tempList.concat(tempList);
          }
        } else {
          // 如果数据大于一页做好取下一页的准备
          this.searchParams.page_num++;
        }
        // 制作为UI效果定制的数据
        let lastItem: RollDataItem = null;
        const rollDataList = [];
        for (const tempItem of tempList) {
          lastItem = new RollDataItem(tempItem, lastItem ? !lastItem.isOdd : true);
          rollDataList.push(lastItem);
        }
        this.dataList = rollDataList;
        this.startScroll();
      } else {
        // 制作为UI效果定制的数据
        let lastItem: RollDataItem = null;
        const rollDataList = [];
        for (const tempItem of tempList) {
          lastItem = new RollDataItem(tempItem, lastItem ? !lastItem.isOdd : true);
          rollDataList.push(lastItem);
        }
        this.dataList = rollDataList;
      }
    }, err => {
      this.globalService.httpErrorProcess(err);
      this.stopScroll();
    });
  }

  public ngAfterViewInit() {
    this.scrollDiv.nativeElement.style['width'] = this.sourceWidth;
    if (this.dataList.length > this.maxListCount) {
      // 列表显示不下了才需要滚动
      this.startScroll();
    }
  }

  public ngOnDestroy() {
    this.searchSubscription && this.searchSubscription.unsubscribe();
    this.delaySubscription && this.delaySubscription.unsubscribe();
    this.scrollSubscription && this.scrollSubscription.unsubscribe();
  }

  /* 继续追加数据 */
  private continueAppendData() {
    if (this.isAppendDataOperation) {
      return;
    }
    this.isAppendDataOperation = true;
    this.dataSubscription && this.dataSubscription.unsubscribe();
    this.dataSubscription = this.dataStatisticsHttpService.requestParkingDynamicInfoList(this.searchParams).subscribe(data => {
      if (data.results.length < GlobalConst.PageSize) {
        // 数据不足一页则下次取首页
        this.searchParams.page_num = 1;
      } else {
        // 如果数据大于一页做好取下一页的准备
        this.searchParams.page_num++;
      }
      const tempList = [];
      data.results.forEach(res => {
        if (res.status > 0) {
          tempList.push(res);
        }
      });

      // 制作为UI效果定制的数据
      let lastItem: RollDataItem = this.dataList[this.dataList.length - 1];
      const rollDataList = [];
      for (const tempItem of tempList) {
        lastItem = new RollDataItem(tempItem, lastItem ? !lastItem.isOdd : true);
        rollDataList.push(lastItem);
      }
      rollDataList.forEach(item => {
        this.dataList.push(item);
      });
      Observable.timer(1).subscribe(() => {
        // 为了绑定数据更新提供缓冲时间
        this.isAppendDataOperation = false;
      });
    }, err => {
      this.globalService.httpErrorProcess(err);
      this.stopScroll();
      Observable.timer(1).subscribe(() => {
        // 为了绑定数据更新提供缓冲时间
        this.isAppendDataOperation = false;
      });
    });
  }

  private startScroll() {
    if (!this.isStopScroll || !this.scrollDiv) {
      return;
    }
    this.scrollSubscription && this.scrollSubscription.unsubscribe();
    this.delaySubscription && this.delaySubscription.unsubscribe();
    this.scrollDiv.nativeElement.scrollTop = 0;
    this.isStopScroll = false;
    this.continueScroll();
  }

  private pauseScroll() {
    this.scrollSubscription && this.scrollSubscription.unsubscribe();
    this.delaySubscription && this.delaySubscription.unsubscribe();
    this.isPauseScroll = true;
  }

  private stopScroll() {
    this.scrollSubscription && this.scrollSubscription.unsubscribe();
    this.delaySubscription && this.delaySubscription.unsubscribe();
    this.isStopScroll = true;
  }

  private continueScroll() {
    if (this.isStopScroll) {
      return;
    }
    this.isPauseScroll = false;
    this.scrollSubscription = Observable.interval(15).subscribe(() => {

      if (this.scrollDiv.nativeElement.scrollTop % this.scrollItemHeight === 0) {
        // 滚动一条之后有短暂的停顿效果
        this.scrollSubscription && this.scrollSubscription.unsubscribe();
        this.delaySubscription && this.delaySubscription.unsubscribe();
        if (this.scrollDiv.nativeElement.scrollTop === this.scrollItemHeight * 2) {
          // 循环移除数据项,防止长时间数据溢出
          this.dataList.shift();
        }
        this.delaySubscription = Observable.timer(1500).subscribe(() => {

          if (!this.isPauseScroll) {
            this.scrollDiv.nativeElement.scrollTop++;
            this.continueScroll();
          }
        });
      } else {
        this.scrollDiv.nativeElement.scrollTop++;
      }

      if (this.scrollDiv.nativeElement.scrollHeight <= this.preLoadingHeight && this.scrollDiv.nativeElement.scrollHeight > 10) {
        // 当距离底部还有20条数据时就开始加载
        this.continueAppendData();
      }
    });
  }

  public onScrollDivMouseEnter() {
    this.pauseScroll();
  }

  public onScrollDivMouseLeave() {
    this.continueScroll();
  }
}

class RollDataItem {
  public isOdd: boolean; // 是否为单数项,用来控制背景颜色
  public source: ParkingDynamicsInfoEntity;

  constructor(source: ParkingDynamicsInfoEntity, isOdd: boolean) {
    this.isOdd = isOdd;
    this.source = source;
  }
}
