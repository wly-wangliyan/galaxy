import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SearchAdapter, SearchAssistant} from '../../../../share/search-assistant';
import {GlobalService} from '../../../../core/global.service';
import {ParkingsHttpService} from '../../../parkings/parkings-http.service';
import {GlobalConst} from '../../../../share/global-const';
import {ProCityDistSelectComponent} from '../../../../share/components/pro-city-dist-select/pro-city-dist-select.component';
import {BasicParkingSearchParams, ParkingEntity} from '../../../parkings/parkings.model';

@Component({
  selector: 'app-operation-parking',
  templateUrl: './operation-parking.component.html',
  styleUrls: ['../../basics.component.css', './operation-parking.component.css'],
  providers: [ParkingsHttpService]
})

export class OperationParkingComponent implements SearchAdapter {

  public searchParams: BasicParkingSearchParams = new BasicParkingSearchParams();

  public searchAssistant: SearchAssistant;

  public companyParkingsList: Array<ParkingEntity> = [];

  public currentSelectCompanyParking: ParkingEntity;

  public companyId: string;

  public current_region_id: string;

  public isLoadComplete = false; // 数据是否加载完成

  @ViewChild(ProCityDistSelectComponent) public proCityDistSelectComponent: ProCityDistSelectComponent;

  constructor(private route: ActivatedRoute, private parkingsHttpService: ParkingsHttpService, private globalService: GlobalService) {
    this.route.params.subscribe(params => {
      this.companyId = params['company_id'];
    });
    this.searchParams.page_size = GlobalConst.PageSize;
    this.searchParams.region_id = GlobalConst.RegionID;
    this.searchParams.status = 1;
    this.currentSelectCompanyParking = new ParkingEntity();
    this.searchAssistant = new SearchAssistant(this);
    this.searchAssistant.submitSearch(true);
  }

  public onSelect(parking: ParkingEntity) {
    this.currentSelectCompanyParking = parking;
  }

  // 点击按钮进行查询
  public clickBtnToSearch() {
    this.searchParams.region_id = this.proCityDistSelectComponent.selectedRegionId;
    this.searchAssistant.submitSearch(false);
  }

  /* SearchDecorator 接口实现 */
  /* 请求检索 */
  public requestSearch(): any {
    this.isLoadComplete = false;
    return this.parkingsHttpService.requestCompanyParkingsData(this.searchParams, this.companyId);
  }

  public continueSearch(url: string): any {
    return this.parkingsHttpService.continueCompanyParkingsData(url);
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

    this.companyParkingsList = results;
    this.isLoadComplete = true;
  }
}
