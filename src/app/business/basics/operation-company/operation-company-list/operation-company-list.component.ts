import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchAdapter, SearchAssistant} from '../../../../share/search-assistant';
import {GlobalService} from '../../../../core/global.service';
import {OperationCompanyHttpService} from '../operation-company-http.service';
import {DataCacheService} from '../../../../core/data-cache.service';
import {GlobalConst} from '../../../../share/global-const';
import {CompaniesSearchParams, CompanyEntity} from '../operation-company.model';

@Component({
  selector: 'app-operation-company-list',
  templateUrl: './operation-company-list.component.html',
  styleUrls: ['../../basics.component.css', './operation-company-list.component.css']
})
export class OperationCompanyListComponent implements OnInit, OnDestroy, SearchAdapter {

  public searchParams: CompaniesSearchParams = new CompaniesSearchParams();

  public searchAssistant: SearchAssistant;

  public companiesList: Array<CompanyEntity> = [];

  public currentSelectCompany: CompanyEntity;

  public isLoadComplete = false; // 数据是否加载完成

  constructor(private dataCacheService: DataCacheService, private operationCompanyHttpService: OperationCompanyHttpService, private globalService: GlobalService) {
    this.searchParams.page_size = GlobalConst.PageSize;
    this.searchAssistant = new SearchAssistant(this);
    this.currentSelectCompany = new CompanyEntity();
  }

  public ngOnInit() {
    this.dataCacheService.getCache().subscribe(cache => {
      if (cache) {
        // 缓存存在,则使用缓存数据
        this.searchParams = cache['searchParams'];
        this.companiesList = cache['companiesList'];
        this.searchAssistant = cache['searchAssistant'];
        this.currentSelectCompany = cache['currentSelectCompany'];
        // 将缓存的检索适配器连接到当前的适配者
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
    this.dataCacheService.setCache(this, 'searchParams', 'companiesList', 'searchAssistant', 'currentSelectCompany');
  }

  public onSelect(company: CompanyEntity) {
    this.currentSelectCompany = company;
  }

  /* SearchAdapter 接口实现 */
  /* 请求检索 */
  public requestSearch(): any {
    this.isLoadComplete = false;
    return this.operationCompanyHttpService.requestCompaniesData(this.searchParams);
  }

  public continueSearch(url: string): any {
    return this.operationCompanyHttpService.continueCompaniesData(url);
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
    this.companiesList = results;
    this.isLoadComplete = true;
  }
}
