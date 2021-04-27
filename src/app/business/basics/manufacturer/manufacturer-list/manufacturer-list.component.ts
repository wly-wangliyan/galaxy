import {Component, OnInit, OnDestroy} from '@angular/core';
import {SearchAdapter, SearchAssistant} from '../../../../share/search-assistant';
import {ManufacturerHttpService} from '../manufacturer-http.service';
import {DataCacheService} from '../../../../core/data-cache.service';
import {GlobalService} from '../../../../core/global.service';
import {ManufacturerEntity, ManufacturerSearchParams} from '../manufacturer.model';

@Component({
  selector: 'app-manufacturer-list',
  templateUrl: './manufacturer-list.component.html',
  styleUrls: ['./manufacturer-list.component.css']
})
export class ManufacturerListComponent implements OnInit, OnDestroy, SearchAdapter {

  public searchParams: ManufacturerSearchParams = new ManufacturerSearchParams();

  public searchAssistant: SearchAssistant;

  public manufacturerList: Array<ManufacturerEntity> = [];

  public currentSelectManufacturer: ManufacturerEntity = new ManufacturerEntity();

  public isLoadComplete = false; // 数据是否加载完成
  
  constructor(private dataCacheService: DataCacheService, private manufacturerHttpService: ManufacturerHttpService, private globalService: GlobalService) {
  }

  public ngOnInit() {
    this.dataCacheService.getCache().subscribe(cache => {
      if (cache) {
        // 缓存存在,则使用缓存数据
        this.searchParams = cache['searchParams'];
        this.manufacturerList = cache['manufacturerList'];
        this.searchAssistant = cache['searchAssistant'];
        this.currentSelectManufacturer = cache['currentSelectManufacturer'];
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
    this.dataCacheService.setCache(this, 'searchParams', 'manufacturerList', 'searchAssistant', 'currentSelectManufacturer');
  }

  public onSelect(item: ManufacturerEntity) {
    this.currentSelectManufacturer = item;
  }

  /* SearchAdapter 接口实现 */
  /* 请求检索 */
  public requestSearch(): any {
    this.isLoadComplete = false;
    return this.manufacturerHttpService.requestManufacturerList(this.searchParams);
  }

  public continueSearch(url: string): any {
    return this.manufacturerHttpService.continueManufacturerList(url);
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

    this.manufacturerList = results;
    this.isLoadComplete = true;
  }
}
