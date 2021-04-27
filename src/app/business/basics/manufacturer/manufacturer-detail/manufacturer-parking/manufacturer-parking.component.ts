import {Component, OnInit} from '@angular/core';
import {SearchAdapter, SearchAssistant} from '../../../../../share/search-assistant';
import {
  ManufacturerHttpService
} from '../../manufacturer-http.service';
import {ActivatedRoute} from '@angular/router';
import {GlobalService} from '../../../../../core/global.service';
import {PlatformOnlineEntity, PlatformOnlineSearchParams} from '../../manufacturer.model';

@Component({
  selector: 'app-manufacturer-parking',
  templateUrl: './manufacturer-parking.component.html',
  styleUrls: ['./manufacturer-parking.component.css']
})
export class ManufacturerParkingComponent implements OnInit, SearchAdapter {

  public searchParams: PlatformOnlineSearchParams = new PlatformOnlineSearchParams();

  private manufacturer_id: string;

  public searchAssistant: SearchAssistant;

  public platformOnlineList: Array<PlatformOnlineEntity> = [];

  public currentSelectPlatformOnline: PlatformOnlineEntity = new PlatformOnlineEntity();

  public isLoadComplete = false; // 数据是否加载完成

  constructor(private route: ActivatedRoute, private manufacturerHttpService: ManufacturerHttpService, private globalService: GlobalService) {
    this.searchAssistant = new SearchAssistant(this);
    this.route.parent.params.subscribe(params => {
      this.manufacturer_id = params['manufacturer_id'];
    });
  }

  public ngOnInit() {
    this.searchAssistant.submitSearch(true);
  }

  public onSelect(item: PlatformOnlineEntity) {
    this.currentSelectPlatformOnline = item;
  }

  public onStatusSelectChanged(value: string) {
    this.searchParams.is_online = value;
    this.searchAssistant.submitSearch(false);
  }

  /* SearchAdapter 接口实现 */
  /* 请求检索 */
  public requestSearch(): any {
    this.isLoadComplete = false;
    return this.manufacturerHttpService.requestManufacturerParkingList(this.searchParams, this.manufacturer_id);
  }

  public continueSearch(url: string): any {
    return this.manufacturerHttpService.continueManufacturerParkingList(url);
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

    this.platformOnlineList = results;
    this.isLoadComplete = true;
  }
}
