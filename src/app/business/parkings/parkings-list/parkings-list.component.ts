import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchAdapter, SearchAssistant} from '../../../share/search-assistant';
import {GlobalService} from '../../../core/global.service';
import {ParkingsHttpService} from '../parkings-http.service';
import {DataCacheService} from '../../../core/data-cache.service';
import {ParkingEntity, ParkingsSearchParams} from '../parkings.model';

@Component({
  selector: 'app-parkings-list',
  templateUrl: './parkings-list.component.html',
  styleUrls: ['./parkings-list.component.css']
})
export class ParkingsListComponent implements OnInit, OnDestroy, SearchAdapter {

  public searchParams: ParkingsSearchParams = new ParkingsSearchParams();

  public searchAssistant: SearchAssistant;

  public parkingsList: Array<ParkingEntity> = [];

  public currentSelectParking: ParkingEntity = new ParkingEntity();

  public isLoadComplete = false; // 数据是否加载完成

  constructor(private dataCacheService: DataCacheService, private parkingsHttpService: ParkingsHttpService, private globalService: GlobalService) {
  }

  public ngOnInit() {
    this.dataCacheService.getCache().subscribe(cache => {
      if (cache) {
        // 缓存存在,则使用缓存数据
        this.searchParams = cache['searchParams'];
        this.parkingsList = cache['parkingsList'];
        this.searchAssistant = cache['searchAssistant'];
        this.currentSelectParking = cache['currentSelectParking'];
        // 将缓存的检索适配器连接到当前的适配者
        this.searchParams.status = this.searchParams.status !== '1' ? this.searchParams.status : '1';
        this.searchAssistant.connect(this);
      } else {
        // 没有缓存则直接使用初始化参数请求数据
        this.searchAssistant = new SearchAssistant(this);
        this.searchAssistant.submitSearch(true);
      }
    });
  }

  public ngOnDestroy() {
    // 当页面销毁时缓存数据,并解除检索适配器对页面的引用
    this.searchAssistant.disconnect();
    this.dataCacheService.setCache(this, 'searchParams', 'parkingsList', 'searchAssistant', 'currentSelectParking');
  }

  /* 生成状态信息 */
  public generateStatus(item: ParkingEntity): string {
    switch (Number(item.status)) {
      case 1:
        return '运营中';
      case 2:
        return '未运营';
      case 3:
        return '待运营';
    }
    return '未知';
  }

  public onSelect(item: ParkingEntity) {
    this.currentSelectParking = item;
  }

  public onStatusSelectChanged(value: string) {
    this.searchParams.status = value;
    this.searchAssistant.submitSearch(false);
  }

  /* SearchAdapter 接口实现 */

  /* 请求检索 */
  public requestSearch(): any {
    this.isLoadComplete = false;
    return this.parkingsHttpService.requestParkingsData(this.searchParams);
  }

  public continueSearch(url: string): any {
    return this.parkingsHttpService.continueParkingsData(url);
  }

  /* 生成并检查参数有效性 */
  public generateAndCheckParamsValid(): boolean {
    return true;
  }

  /* 检索失败处理 */
  public searchErrProcess(err: any) {
    this.globalService.httpErrorProcess(err);
  }

  /* 检索成功处理 */
  public searchCompleteProcess(results: Array<any>, isFuzzySearch: boolean) {
    if (results.length === 0 && !isFuzzySearch) {
      // 精确查询时需要弹出提示
      this.globalService.promptBox.open('暂未查询到数据！');
    }

    this.parkingsList = results;
    this.isLoadComplete = true;
  }
}
