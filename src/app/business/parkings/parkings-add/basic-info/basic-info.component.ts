import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalService} from '../../../../core/global.service';
import {DataCacheService} from '../../../../core/data-cache.service';
import {HttpErrorEntity} from '../../../../core/http.service';
import {ProCityDistSelectComponent} from '../../../../share/components/pro-city-dist-select/pro-city-dist-select.component';
import {
  MapItem, MapType,
  ZMapSelectPointComponent
} from '../../../../share/components/z-map-select-point/z-map-select-point.component';
import {CanDeactivateComponent} from '../../../../share/interfaces/can-deactivate-component';
import {ParkingsDataService} from '../../parkings-data.service';
import {ParkingsHttpService} from '../../parkings-http.service';
import {SpecialKeyCode} from '../../../../../utils/keyboard-helper';
import {ParkingEntity} from '../../parkings.model';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['../../parkings.component.css', '../parkings-add.component.css'],
  providers: [ParkingsDataService]
})

export class BasicInfoComponent implements CanDeactivateComponent {

  public parkingsInfo: ParkingEntity = new ParkingEntity();

  public mapObj: MapItem = {
    point: [],
    type: MapType.edit,
    address: '',
    hasDetailedAddress: false,
    cityCode: ''
  };

  public select_region_id: string;

  public parkingsType: Array<string> = ['1', '2', '3', '6', '8', '9', '10'];

  private editSuccess = false; // 编辑是否成功

  private parkingTypeDirty = false;

  private selectAddressDirty = false;

  @ViewChild(ProCityDistSelectComponent) public proCityDistSelectComponent: ProCityDistSelectComponent;

  @ViewChild(ZMapSelectPointComponent) public zMapSelectPointComponent: ZMapSelectPointComponent;

  @ViewChild('createParkingsInfoForm') public createParkingsInfoForm: any;

  /**
   * 获取是否填写地址(表单校验)
   * @returns {boolean}
   */
  public get checkRegionId(): boolean {
    this.parkingsInfo.region_id = this.proCityDistSelectComponent.selectedRegionId;
    if (this.parkingsInfo.region_id) {
      return true;
    }
    return false;
  }

  /**
   * 获取是否有停车场类型被选中了(表单校验)
   * @returns {boolean}
   */
  public get checkedParkingType(): boolean {
    if (this.parkingsInfo.parking_type.length > 0) {
      return true;
    }
    return false;
  }

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dataCacheService: DataCacheService,
              private parkingsHttpService: ParkingsHttpService,
              private parkingsDataService: ParkingsDataService,
              private globalService: GlobalService) {
    this.parkingsInfo.parking_type = this.parkingsInfo.parking_type ? this.parkingsInfo.parking_type : [];
  }

  // 省市区code改变时清空详细地址等数据
  public onRegionIdChanged(event) {
    this.select_region_id = event;
    this.parkingsInfo.address = this.parkingsInfo.lon = this.parkingsInfo.lat = '';
  }

  public checkAddress(event: any) {
    const keyCode = event.keyCode || event.which || event.charCode;
    if ((keyCode === SpecialKeyCode.Backspace || keyCode === SpecialKeyCode.Delete) && this.parkingsInfo.address === '') {
      this.mapObj.point = [];
      this.parkingsInfo.lon = this.parkingsInfo.lat = '';
    }
  }

  // 打开地图组件
  public openMapModal() {
    this.mapObj.point = [];
    this.parkingsInfo.address = this.parkingsInfo.address ? this.parkingsInfo.address : '';
    if (this.parkingsInfo.address) {
      this.mapObj.hasDetailedAddress = true;
    }
    if (this.parkingsInfo.lon && this.parkingsInfo.lat) {
      this.mapObj.point.push(Number(this.parkingsInfo.lon));
      this.mapObj.point.push(Number(this.parkingsInfo.lat));
    }
    this.mapObj.address = this.proCityDistSelectComponent.selectedAddress + this.parkingsInfo.address;
    this.mapObj.cityCode = this.proCityDistSelectComponent.selectedRegionId;
    this.zMapSelectPointComponent.openMap();
  }

  // 获取地图选择结果
  public getSelectedMarker(event) {
    if (event.selectedMarker && event.selectedMarker.regeocode) {
      const regeocode = event.selectedMarker.regeocode;
      const addressComponent = regeocode.addressComponent;

      this.selectAddressDirty = true;
      this.select_region_id = addressComponent.adcode;
      this.parkingsInfo.address = regeocode.formattedAddress.replace(addressComponent.province + addressComponent.city + addressComponent.district, '');
      this.parkingsInfo.lon = event.selectedMarker.point.lng;
      this.parkingsInfo.lat = event.selectedMarker.point.lat;
    }
  }

  // 选择停车场类型
  public changeParkingType(event) {
    const park_type = this.parkingsInfo.parking_type;
    const index = park_type.indexOf(event.target.value);
    this.parkingTypeDirty = true;
    if (index < 0) {
      if (event.target.checked) {
        this.parkingsInfo.parking_type.push(event.target.value);
      }
    } else {
      if (!event.target.checked) {
        this.parkingsInfo.parking_type.splice(index, 1);
      }
    }
  }

  // 提交添加停车场信息
  public onAddParkingsFormSubmit() {
    if (!this.parkingsDataService.generateAndCheckParamsValid(this.parkingsInfo)) {
      return;
    }
    this.requestAddParkings();
  }

  // 添加停车场
  public requestAddParkings() {
    this.parkingsHttpService.requestAddParkingsData(this.parkingsInfo).subscribe(data => {
      const result = data.json();
      this.globalService.promptBox.open('添加成功！', () => {
        this.editSuccess = true;
        this.dataCacheService.clear();
        this.router.navigate(['../select-groups', result.parking_id], {relativeTo: this.route});
      });
    }, err => {
      if (!this.globalService.httpErrorProcess(err)) {
        if (err.status === 422) {
          const error: HttpErrorEntity = HttpErrorEntity.Create(err.json());

          for (const content of error.errors) {
            if (content.field === 'parking_name' && content.code === 'missing_field') {
              this.globalService.promptBox.open('停车场名称参数缺失！');
              return;
            } else if (content.field === 'parking_name' && content.code === 'invalid') {
              this.globalService.promptBox.open('停车场名称无效或不合法！');
              return;
            } else if (content.field === 'parking_name' && content.code === 'already_exist') {
              this.globalService.promptBox.open('停车场名称不能重复，请重新输入！');
              return;
            }
          }
        }
      }
    });
  }

  public canDeactivate(): boolean {
    return this.editSuccess || !this.createParkingsInfoForm || (!this.createParkingsInfoForm.dirty && !this.proCityDistSelectComponent.dirty && !this.selectAddressDirty && !this.parkingTypeDirty);
  }
}
