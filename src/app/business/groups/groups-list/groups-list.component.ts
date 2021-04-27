import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchAdapter, SearchAssistant} from '../../../share/search-assistant';
import {GlobalService} from '../../../core/global.service';
import {GroupEntity, GroupsHttpService, GroupSearchParams} from '../groups-http.service';
import {GroupsDataService} from '../groups-data.service';
import {GlobalConst} from '../../../share/global-const';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit, OnDestroy, SearchAdapter {

  public searchParams: GroupSearchParams = new GroupSearchParams();

  public searchAssistant: SearchAssistant;

  public groupsList: Array<GroupEntity> = [];

  public groupTypeList: Array<string> = ['1', '2', '3', '4', '5', '0'];

  public currentSelectGroups: GroupEntity;

  public isLoadComplete = false; // 数据是否加载完成

  constructor(private groupsDataService: GroupsDataService, private groupsHttpService: GroupsHttpService, private globalService: GlobalService) {
    this.searchParams.page_size = GlobalConst.PageSize;
    this.searchParams.parking_group_types = '';
    this.searchAssistant = new SearchAssistant(this);
    this.currentSelectGroups = new GroupEntity();
  }

  public ngOnInit() {
    this.groupsDataService.getCache().subscribe(cache => {
      if (cache) {
        // 缓存存在,则使用缓存数据
        this.searchParams = cache['searchParams'];
        this.groupsList = cache['groupsList'];
        this.searchAssistant = cache['searchAssistant'];
        this.currentSelectGroups = cache['currentSelectGroups'];
        // 将缓存的检索适配器连接到当前的适配者
        this.searchParams.parking_group_types = this.searchParams.parking_group_types ? this.searchParams.parking_group_types : '';
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
    this.groupsDataService.setCache(this, 'searchParams', 'groupsList', 'searchAssistant', 'currentSelectGroups');
  }

  public onSelect(group: GroupEntity) {
    this.currentSelectGroups = group;
  }

  public onStatusSelectChanged(value: string) {
    this.searchParams.parking_group_types = value;
    this.searchAssistant.submitSearch(false);
  }

  /* SearchAdapter 接口实现 */
  /* 请求检索 */
  public requestSearch(): any {
    this.isLoadComplete = false;
    return this.groupsHttpService.requestGroupsData(this.searchParams);
  }

  public continueSearch(url: string): any {
    return this.groupsHttpService.continueGroupsData(url);
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

    this.groupsList = results;
    this.isLoadComplete = true;
  }

  // 删除组
  public onDeleteItemClick(group: GroupEntity) {
    this.globalService.confirmationBox.open('是否确认删除该组，此操作不可逆？', () => {
      this.globalService.confirmationBox.close();
      this.groupsHttpService.requestDeleteGroups(group.parking_group_id).subscribe(() => {
        // 组数据有改动时更新global.service中组数据
        this.globalService.resetGroups();
        this.searchAssistant.submitSearch(true);
      }, err => {
        this.globalService.httpErrorProcess(err);
      });
    }, '确定');
  }
}
