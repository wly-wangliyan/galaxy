import {Component, OnInit, OnDestroy} from '@angular/core';
import {EmployeesHttpService, UserSearchParams} from '../employees-http.service';
import {SearchAdapter, SearchAssistant} from '../../../share/search-assistant';
import {UserEntity} from '../../../core/auth.service';
import {GlobalService} from '../../../core/global.service';
import {DataCacheService} from '../../../core/data-cache.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css'],
})
export class EmployeesListComponent implements OnInit, OnDestroy, SearchAdapter {

  public searchParams: UserSearchParams = new UserSearchParams();

  public dataList: Array<UserEntity> = [];

  public searchAssistant: SearchAssistant;

  public selectTableItem: UserEntity = new UserEntity();

  public isLoadComplete = false; // 数据是否加载完成

  constructor(private globalService: GlobalService,
              private employeesHttpService: EmployeesHttpService,
              private dataCacheService: DataCacheService) {
  }

  public ngOnInit() {
    this.dataCacheService.getCache().subscribe(cache => {
      if (cache) {
        // 缓存存在,则使用缓存数据
        this.searchParams = cache['searchParams'];
        this.dataList = cache['dataList'];
        this.searchAssistant = cache['searchAssistant'];
        this.selectTableItem = cache['selectTableItem'];
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
    this.dataCacheService.setCache(this, 'searchParams', 'dataList', 'searchAssistant', 'selectTableItem');
  }

  /* SearchAdapter 接口实现 */
  /* 请求检索 */
  public requestSearch(): any {
    this.isLoadComplete = false;
    return this.employeesHttpService.requestUserList(this.searchParams);
  }

  public continueSearch(url: string): any {
    return this.employeesHttpService.continueUserList(url);
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
    // 获取当前页面数据
    this.dataList = results;
    this.isLoadComplete = true;
  }

  public onSelectTableItem(selectTableItem: UserEntity) {
    this.selectTableItem = selectTableItem;
  }

  public onResetPasswordBtnClick(dataItem: UserEntity) {
    this.globalService.confirmationBox.open('是否确定重置密码，此操作不可逆！', () => {
      this.globalService.confirmationBox.close();
      this.employeesHttpService.requestResetPassword(dataItem.username).subscribe(() => {
        this.globalService.promptBox.open(' 密码重置成功，新密码已下发到员工邮箱！');
      }, err => {
        this.globalService.httpErrorProcess(err);
      });
    });
  }

  public onDeleteItemClick(dataItem: UserEntity) {
    this.globalService.confirmationBox.open('确认删除该员工，此操作不可恢复！', () => {
      this.globalService.confirmationBox.close();
      this.employeesHttpService.requestDeleteUser(dataItem.username).subscribe(() => {
        this.searchAssistant.submitSearch(true);
      }, err => {
        this.globalService.httpErrorProcess(err);
      });
    }, '删除');
  }
}
