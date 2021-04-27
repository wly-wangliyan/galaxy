import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {GroupEditEntity, GroupEntity, GroupsHttpService} from '../groups-http.service';
import {GlobalService} from '../../../core/global.service';
import {RegionEntity} from '../../../core/region-http.service';
import {ParkingsHttpService} from '../../parkings/parkings-http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorEntity} from '../../../core/http.service';
import {GroupsDataService, ParkingItem} from '../groups-data.service';
import {GlobalConst} from '../../../share/global-const';
import {CanDeactivateComponent} from '../../../share/interfaces/can-deactivate-component';
import {ParkingsSearchParams} from '../../parkings/parkings.model';
import {CheckboxState} from "../../../share/components/beautify-checkbox/beautify-checkbox.component";

@Component({
  selector: 'app-groups-edit',
  templateUrl: './groups-edit.component.html',
  styleUrls: ['..//groups.component.css', './groups-edit.component.css'],
  providers: [ParkingsHttpService]
})
export class GroupsEditComponent implements OnInit, CanDeactivateComponent {

  public groupsInfo: GroupEntity = new GroupEntity();

  public updateGroupInfo: GroupEditEntity = new GroupEditEntity();

  public groupTypeList: Array<number> = [1, 2, 3, 4, 5, 0];

  public regionsList: Array<RegionEntity> = [];

  public selectedRegion: RegionEntity = new RegionEntity;

  public isShow = true;

  public group_id: string;

  private temSelectedGroupArr: Array<any> = [];

  private editSuccess = false; // 编辑是否成功

  private isInitSearchParkings = true;

  private groupTypeDirty = false;

  private parkingDirty = false;

  private fromPath: 'list' | 'detail' = 'list';

  public searchParams: ParkingsSearchParams = new ParkingsSearchParams();

  public parkingsList: Array<ParkingItem> = [];

  public selectedParkingList: Array<ParkingItem> = [];

  private containerHeight: number; // 容器的高度

  private loadingFlag = true;

  private tempRegionParkingList: Array<any> = []; // 临时区域停车场数据列表

  private isLinkUrl = true; // 是否存在link

  private currentScrollElement: any; // 当前滚动条元素

  private loadingTimerSubscription: Subscription;

  @ViewChild('editGroupsForm') public editGroupsForm: any;

  /**
   * 获取是否有组类型被选中了(表单校验)
   * @returns {boolean}
   */
  public get checkedGroupsType(): boolean {
    if (this.temSelectedGroupArr.length > 0) {
      return true;
    }
    return false;
  }

  constructor(private router: Router, private route: ActivatedRoute, private globalService: GlobalService, private parkingsHttpService: ParkingsHttpService, private groupsHttpService: GroupsHttpService, private groupsDataService: GroupsDataService) {
    this.route.paramMap.subscribe(map => {
      this.group_id = map.get('parking_group_id');
    });
    this.route.queryParamMap.subscribe(map => {
      this.fromPath = map.get('from') === 'detail' ? 'detail' : 'list';
    });
    this.searchParams.page_num = 1;
    this.searchParams.page_size = GlobalConst.PageSize;
    this.searchParams.status = '1';

  }

  public ngOnInit() {
    this.requestGroupsByIdData();
  }

  private requestGroupsByIdData() {
    this.groupsHttpService.requestGroupsByIdData(this.group_id).subscribe(data => {
      this.selectedParkingList = [];
      this.groupsInfo = data;
      this.temSelectedGroupArr = this.groupsInfo.parking_group_types;
      this.selectedParkingList = this.groupsInfo.parkings.map(parking => new ParkingItem(parking));
      // 获取省市区数据
      this.getRegionsData();
    });
  }

  /* 容器div滚动事件 */
  public onScrollContainerScroll(event: any) {
    const target = event.target;
    this.currentScrollElement = target;
    this.containerHeight = $('.scroll-container').outerHeight();

    if (target.scrollTop + this.containerHeight >= target.scrollHeight / 2) {
      // 当滚动高度与容器高度之和超过总高度一半就开始加载新数据
      this.loadMoreData();
    }
  }

  private loadMoreData() {
    if (this.loadingFlag) {
      return;
    }
    this.loadingFlag = true;
    // 模拟1.5秒获取到数据
    this.loadingTimerSubscription && this.loadingTimerSubscription.unsubscribe();
    this.loadingTimerSubscription = Observable.timer(1500).subscribe(() => {
      if (this.isLinkUrl) {
        this.searchParams.page_num++;
        this.requestParkingsData();
      }
    });
  }

  // 选择组类型
  public changeGroupsType(event) {
    const park_type = this.temSelectedGroupArr;
    const index = park_type.indexOf(event[1]);
    this.groupTypeDirty = true;
    if (index < 0) {
      if (event[0] === CheckboxState.checked) {
        this.temSelectedGroupArr.push(event[1]);
      }
    } else {
      this.temSelectedGroupArr.splice(index, 1);
    }
  }

  // 获取省市区数据
  public getRegionsData() {
    this.globalService.regions.subscribe(() => {
      this.getRegionsByRegionId(GlobalConst.RegionID);
    });
  }

  // 通过省市区code显示所需省市区数据
  public getRegionsByRegionId(region_id: string) {
    this.globalService.getRegionById(region_id).subscribe(data => {
      if (data && data.length > 0) {
        this.regionsList = data[0].cities;
        this.selectedRegion = this.regionsList[0];
        this.searchParams.page_num = 1;
        this.searchParams.region_id = this.selectedRegion.region_id;
        this.requestParkingsData();
      }
    });
  }

  /**
   * 选择区域请求当前区域停车场数据
   * 发出请求前判断当前区域停车场数据是否请求过，如果请求过，则不再发出区域停车场数据请求
   * 临时区域停车场数据列表中没有当前区域停车场数据时发出请求
   */
  public requestRegionParkings(region: RegionEntity, num: number) {
    if (num === 1) {
      this.isShow = !this.isShow;
    } else {
      this.isShow = true;
    }

    $(this.currentScrollElement).scrollTop(0);
    this.selectedRegion = region;
    if (this.tempRegionParkingList.length > 0) {
      for (const regionParkingIndex of this.tempRegionParkingList) {
        if (regionParkingIndex.region_id === region.region_id) {
          this.parkingsList = [];
          this.parkingsList = regionParkingIndex.parkingsList;
          return;
        }
      }
    }
    this.isInitSearchParkings = true;
    this.searchParams.page_num = 1;
    this.searchParams.region_id = region.region_id;
    this.searchParams.parking_name = '';
    this.requestParkingsData();
  }

  // 输入停车场名称查询
  public searchParking() {
    this.searchParams.page_num = 1;
    this.parkingsList = [];
    this.requestParkingsData();
  }

  // 选择停车场
  public selectedParkings(event: any) {
    if (event[0] === CheckboxState.checked) {
      for (const selectedParking of this.selectedParkingList) {
        if (event[1].source.parking_id === selectedParking.source.parking_id) {
          return;
        }
      }
      event[1].isChecked = true;
      this.selectedParkingList.push(event[1]);
    } else if (event[0] === CheckboxState.unchecked) {
      this.selectedParkingList = this.selectedParkingList.filter(selectedParking => {
        return event[1].source.parking_id !== selectedParking.source.parking_id;
      });
      event[1].isChecked = false;
    }
    this.parkingDirty = true;
  }

  // 取消选择
  public cancelSelectedParkings(index: number) {
    const selectedParking = this.selectedParkingList[index];
    for (const parking of this.selectedParkingList) {
      if (parking.source.parking_id === selectedParking.source.parking_id) {
        parking.isChecked = false;
        this.selectedParkingList.splice(index, 1);
        break;
      }
    }
    for (const parkingItem of this.parkingsList) {
      if (parkingItem.source.parking_id === selectedParking.source.parking_id) {
        parkingItem.isChecked = false;
        break;
      }
    }
  }

  // 提交添加组管理数据
  public onAddGroupsFormSubmit() {
    const parking_ids = [];
    this.selectedParkingList.forEach(parking => {
      parking_ids.push(parking.source.parking_id);
    });
    this.updateGroupInfo.parking_group_name = this.groupsInfo.parking_group_name;
    this.updateGroupInfo.parking_group_types = this.temSelectedGroupArr.join();
    this.updateGroupInfo.parking_ids = parking_ids.join();

    this.groupsHttpService.requestUpdateGroupsData(this.updateGroupInfo, this.group_id).subscribe(() => {
      this.globalService.promptBox.open('编辑成功！', () => {
        // 组数据有改动时更新global.service中组数据
        this.globalService.resetGroups();
        this.editSuccess = true;
        this.groupsDataService.clear();
        this.navigated();
      });
    }, err => {
      if (!this.globalService.httpErrorProcess(err)) {
        if (err.status === 422) {
          const error: HttpErrorEntity = HttpErrorEntity.Create(err.json());

          for (const content of error.errors) {
            if (content.field === 'parking_group_name' && content.code === 'missing_field') {
              this.globalService.promptBox.open('分组名称参数缺失！');
              return;
            } else if (content.field === 'parking_group_name' && content.code === 'invalid') {
              this.globalService.promptBox.open('分组名称无效或不合法！');
              return;
            } else if (content.field === 'parking_group_name' && content.code === 'failed') {
              this.globalService.promptBox.open('添加失败！');
              return;
            } else if (content.resource === 'parking_group' && content.code === 'already_exist') {
              this.globalService.promptBox.open('分组名称不能重复，请重新输入！');
              return;
            }
          }
        }
      }
    });
  }

  // 请求停车场数据
  public requestParkingsData() {
    this.loadingFlag = true;
    this.loadingTimerSubscription && this.loadingTimerSubscription.unsubscribe();
    this.parkingsHttpService.requestParkingsData(this.searchParams, false).subscribe(data => {
      this.loadingFlag = false;
      this.isLinkUrl = data.linkUrl ? true : false;
      if (this.isInitSearchParkings) {
        this.isInitSearchParkings = false;
        this.parkingsList = [];
        this.processParking(data.results);
        // 初始化请求停车场数据时缓存一份临时停车场数据
        this.tempRegionParkingList.push({'region_id': this.searchParams.region_id, 'parkingsList': this.parkingsList});
      } else {
        this.processParking(data.results);
      }
    }, err => {
      this.globalService.httpErrorProcess(err);
    });
  }

  // 处理停车场数据
  private processParking(results: Array<any>) {
    if (this.selectedParkingList.length > 0) {
      results.forEach(parking => {
        const parkingItem = new ParkingItem(parking);
        this.selectedParkingList.forEach(selectedParking => {
          if (selectedParking.source.parking_id === parking.parking_id) {
            parkingItem.isChecked = true;
          }
        });
        this.parkingsList.push(parkingItem);
      });
    } else {
      results.forEach(parking => {
        this.parkingsList.push(new ParkingItem(parking));
      });
    }
  }

  public onCancelBtnClick() {
    this.navigated();
  }

  private navigated() {
    if (this.fromPath === 'detail') {
      this.router.navigate(['../../detail', this.group_id], {relativeTo: this.route});
    } else {
      this.router.navigate(['../'], {relativeTo: this.route});
    }
  }

  public canDeactivate(): boolean {
    return this.editSuccess || !this.editGroupsForm || (!this.editGroupsForm.dirty && !this.groupTypeDirty && !this.parkingDirty);
  }
}
