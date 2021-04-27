import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ManufacturerHttpService} from '../../manufacturer-http.service';
import {GlobalService} from '../../../../../core/global.service';
import {SearchAssistant, SearchAdapter} from '../../../../../share/search-assistant';
import {ZPhotoSelectComponent} from '../../../../../share/components/z-photo-select/z-photo-select.component';
import {Observable} from 'rxjs/Observable';
import {ManufacturerPlatFormEntity} from '../../manufacturer.model';

@Component({
  selector: 'app-manufacturer-platform',
  templateUrl: './manufacturer-platform.component.html',
  styleUrls: ['./manufacturer-platform.component.css']
})
export class ManufacturerPlatformComponent implements OnInit, SearchAdapter {

  private manufacturer_id: string;

  public searchAssistant: SearchAssistant;

  public platformList: Array<ManufacturerPlatFormEntity> = [];

  public currentSelectPlatform: ManufacturerPlatFormEntity = new ManufacturerPlatFormEntity();

  public isLoadComplete = false; // 数据是否加载完成
  
  @ViewChild(ZPhotoSelectComponent) public zPhotoSelectComponent: ZPhotoSelectComponent;

  constructor(private route: ActivatedRoute, private manufacturerHttpService: ManufacturerHttpService, private globalService: GlobalService) {
    this.searchAssistant = new SearchAssistant(this);
    this.route.parent.params.subscribe(params => {
      this.manufacturer_id = params['manufacturer_id'];
    });
  }

  public ngOnInit() {
    this.searchAssistant.submitSearch(true);
  }

  public onSelect(item: ManufacturerPlatFormEntity) {
    this.currentSelectPlatform = item;
  }

  /* SearchAdapter 接口实现 */
  /* 请求检索 */
  public requestSearch(): any {
    this.isLoadComplete = false;
    return this.manufacturerHttpService.requestManufacturerPlatformList(this.manufacturer_id);
  }

  public continueSearch(url: string): any {
    return this.manufacturerHttpService.continueManufacturerPlatformList(url);
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

    this.platformList = results;
    this.isLoadComplete = true;
  }

  public onDetailBtnClick(item: ManufacturerPlatFormEntity) {
    this.currentSelectPlatform = item;
    Observable.timer(1).subscribe(() => {
      this.zPhotoSelectComponent.zoomPicture();
    });
  }
}
