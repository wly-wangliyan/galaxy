import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SearchAdapter, SearchAssistant} from '../../../share/search-assistant';
import {GlobalService} from '../../../core/global.service';
import {GroupEntity, GroupParkingsEntity, GroupParkingsSearchParams, GroupsHttpService} from '../groups-http.service';
import {GlobalConst} from '../../../share/global-const';

@Component({
  selector: 'app-groups-detail',
  templateUrl: './groups-detail.component.html',
  styleUrls: ['./groups-detail.component.css']
})
export class GroupsDetailComponent implements SearchAdapter {

  public searchParams: GroupParkingsSearchParams = new GroupParkingsSearchParams();

  public searchAssistant: SearchAssistant;

  public groupsParkingsList: Array<GroupParkingsEntity> = [];

  public currentSelectParking: GroupParkingsEntity;

  public group_id: string;

  public groupDetailInfo: GroupEntity = new GroupEntity();

  public isLoadComplete = false; // 数据是否加载完成

  constructor(private route: ActivatedRoute, private groupsHttpService: GroupsHttpService, private globalService: GlobalService) {
    this.route.paramMap.subscribe(map => {
      this.group_id = map.get('parking_group_id');
    });
    this.searchParams.page_size = GlobalConst.PageSize;
    this.searchAssistant = new SearchAssistant(this);
    this.currentSelectParking = new GroupParkingsEntity();
    this.requestGroupsByIdData();
  }

  // 查看组详情
  public requestGroupsByIdData() {
    this.groupsHttpService.requestGroupsByIdData(this.group_id).subscribe(data => {
      this.searchAssistant.submitSearch(true);
      this.groupDetailInfo = data;
    });
  }

  public onSelect(parking: GroupParkingsEntity) {
    this.currentSelectParking = parking;
  }

  /* SearchAdapter 接口实现 */
  /* 请求检索 */
  public requestSearch(): any {
    this.isLoadComplete = false;
    return this.groupsHttpService.requestGroupParkingsData(this.searchParams, this.group_id);
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

    this.groupsParkingsList = results;
    this.isLoadComplete = true;
  }
}
