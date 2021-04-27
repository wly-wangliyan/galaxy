import {nonEnumerable, ZCoreBase} from '../../../utils/z-core';
import {UserEntity} from '../../core/auth.service';
import {CompanyEntity} from '../basics/operation-company/operation-company.model';
import {ManufacturerPlatFormEntity} from '../basics/manufacturer/manufacturer.model';
import {isNullOrUndefined} from "util";
import {DateFormatter} from "@angular/common/src/pipes/intl";
import {DateFormatHelper} from "../../../utils/date-format-helper";

export class ParkingEntity extends ZCoreBase {
  public parking_id: string; // 停车场id/编号
  public parking_name = ''; // 停车场名称
  public province: string; // 省
  public city: string; // 市
  public district: string; // 区
  public region_id: string; // 行政区域code
  public address = ''; // 地址
  public lon: string; // 经度
  public lat: string; // 纬度
  public area_type = 1; // 用地类型 1:路内 2:路外
  public parking_type: Array<any>; // 停车场类型 1:地上停车场 2:桥下停车场 3:地下停车场 4:停车楼 5:立体车库 0:其他
  public contacts = ''; // 联系人
  public telephone = ''; // 联系电话
  public images: Array<string>; // 图片集
  public parking_groups: Array<any>; // 停车场分组
  public parking_company: ParkingCompanyEntity; // 运营关系
  public parking_platform: ParkingPlatformEntity; // 收费关系
  public status: number; // deprecated 状态 1:正常, 2: 已注销
  public beian_status: number; // 备案状态 1:已备案 2:未备案 3:已到期
  public cancel_time: number; // 注销时间
  public updated_time: number; // 更新时间
  public created_time: number; // 创建时间
  public start_time: number; // Float	备案有效开始时间
  public end_time: number; // Float	备案有效结束时间
  public parking_category: number; // 停车场类型 1:停车楼 2:地下停车场 3:地面停车场 6:立体停车场 8:地面+地下停车场 9:地面+停车楼 10:地面+地下+停车楼

  @nonEnumerable
  public get companyName(): string {
    const name = this.parking_company && this.parking_company.company && this.parking_company.company.company_name;
    return name;
  }

  @nonEnumerable
  public get companyId(): string {
    const id = this.parking_company && this.parking_company.company && this.parking_company.company.company_id;
    return id;
  }

  /* 带有厂商信息的全名 */
  @nonEnumerable
  public get platformFullName(): string {
    let name = '';
    if (this.manufacturerName) {
      name = this.platformName && this.manufacturerName && (this.platformName + ' - ' + this.manufacturerName);
    } else {
      // 只有管理系统没有厂商时不显示厂商
      name = this.platformName;
    }
    return name;
  }

  @nonEnumerable
  public get platformName(): string {
    const name = this.parking_platform && this.parking_platform.platform && this.parking_platform.platform.platform_name;
    return name;
  }

  @nonEnumerable
  public get platformId(): string {
    const id = this.parking_platform && this.parking_platform.platform && this.parking_platform.platform.platform_id;
    return id;
  }

  @nonEnumerable
  public get manufacturerName(): string {
    const name = this.parking_platform && this.parking_platform.platform && this.parking_platform.platform.manufacturer && this.parking_platform.platform.manufacturer.manufacturer_name;
    return name;
  }

  @nonEnumerable
  public get manufacturerId(): string {
    const id = this.parking_platform && this.parking_platform.platform && this.parking_platform.platform.manufacturer && this.parking_platform.platform.manufacturer.manufacturer_id;
    return id;
  }

  public skipProperties(): Array<string> {
    const properties = super.skipProperties();
    properties.push('parking_id');
    properties.push('province');
    properties.push('city');
    properties.push('district');
    properties.push('parking_groups');
    properties.push('parking_company');
    properties.push('parking_platform');
    properties.push('status');
    properties.push('beian_status');
    properties.push('cancel_time');
    properties.push('updated_time');
    properties.push('created_time');
    properties.push('start_time');
    properties.push('end_time');
    return properties;
  }

  public toEditJson() {
    const json = this.json();
    json['parking_type'] = json['parking_type'].toString();
    return json;
  }

  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'parking_company') {
      return ParkingCompanyEntity;
    } else if (propertyName === 'parking_platform') {
      return ParkingPlatformEntity;
    }
    return null;
  }
}

export class ParkingCompanyEntity extends ZCoreBase {
  public parking_company_id: string; // 运营公司id
  public parking: any; // 停车场
  public company: CompanyEntity; // 运营公司
  public start_time: number; // 运营公司开始时间
  public is_deleted: boolean; // 删除标记
  public deleted_time: number; // 更新时间
  public created_time: number; // 创建时间

  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'company') {
      return CompanyEntity;
    }
    return null;
  }
}

export class ParkingPlatformEntity extends ZCoreBase {
  public parking_platform_id: string; // 收费平台id
  public parking: any; // 停车场
  public platform: ManufacturerPlatFormEntity; // 收费平台
  public start_time: number; // 收费平台开始时间
  public is_deleted: boolean; // 删除标记
  public deleted_time: number; // 更新时间
  public created_time: number; // 创建时间

  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'platform') {
      return ManufacturerPlatFormEntity;
    }
    return null;
  }
}

export class ParkingsSearchParams {
  public parking_id: string; // 停车场编码
  public parking_name: string; // 停车场名称
  public region_id: string; // 行政区域code
  public address: string; // 地址
  public company_name: string; // 运营公司名称
  public platform_name: string; // 收费系统名称
  public manufacturer_name: string; // 系统厂商名称
  public status = '1'; // 状态	1:运营中 2:未运营 3:运营过期
  public page_num: number; // 页码
  public page_size: number; // 每页条数
}

export class ParkingUpdateRecordSearchParams {
  public update_type: number; // 变更类型 1: 基本信息 2: 分组 3: 运营公司 4: 收费系统
  public operate_type: string; // 操作类型 add, update, cancel
  public realname: string; // 操作人
  public update_start_time: string; // 更新开始时间
  public update_end_time: string; // 更新结束时间
  public page_num: number; // 页码
  public page_size: number; // 每页条数
}

export class ParkingUpdateRecordEntity extends ZCoreBase {
  public record_id: string; // 记录id
  public msg: ParkingUpdateRecordMsgEntity; // 变更详情
  public update_type: number; // 变更类型 1: 基本信息 2: 分组 3: 物业公司 4: 系统厂商
  public operate_type: string; // 操作类型 add, update, cancel
  public user: UserEntity; // 操作人
  public operator: string; // 操作人
  public updated_time: number; // 更新时间
  public created_time: number; // 创建时间
  public parking: ParkingEntity;

  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'msg') {
      return ParkingUpdateRecordMsgEntity;
    }
    if (propertyName === 'user') {
      return UserEntity;
    }
    if (propertyName === 'parking') {
      return ParkingEntity;
    }
    return null;
  }
}

export class ParkingUpdateRecordMsgEntity extends ZCoreBase {
  public address: string;
  public area_type: number;
  public city: string;
  public contacts: string;
  public district: string;
  public images: Array<any>;
  public lat: string;
  public lon: string;
  public parking_name: string;
  public parking_type: Array<any>; // deprecated
  public parking_category: number;
  public province: string;
  public region_id: string;
  public status: number;
  public telephone: string;
  public beian_status: string;
  public parking_group_names: string;

  public u_address: string;
  public u_area_type: number;
  public u_city: string;
  public u_contacts: string;
  public u_images: Array<any>;
  public u_lat: string;
  public u_lon: string;
  public u_parking_name: string;
  public u_parking_type: Array<any>;
  public u_parking_category: number;
  public u_province: string;
  public u_region_id: string;
  public u_status: number;
  public u_telephone: string;
  public u_parking_group_names: string;
  public u_beian_status: string;

  public u_company_name: string;
  public company_name: string;
  public manufacturer_name: string;
  public platform_name: string;
  public start_time: number;
  public u_manufacturer_name: string;
  public u_platform_name: string;
  public u_start_time: string;

  @nonEnumerable
  public get platformFullName(): string {
    if (this.platform_name && this.manufacturer_name) {
      return this.platform_name + '-' + this.manufacturer_name;
    }
    return '--';
  }

  @nonEnumerable
  public get u_platformFullName(): string {
    if (this.u_platform_name && this.u_manufacturer_name) {
      return this.u_platform_name + '-' + this.u_manufacturer_name;
    }
    return '--';
  }
}

export class ParkingBindCompanyEntity extends ZCoreBase {
  public company_id: string; // 运营公司id
  public start_time: string; // 开始时间
}

export class ParkingBindPlatformEntity extends ZCoreBase {
  public platform_id: string; // 收费平台id
  public start_time: string; // 开始时间
}

export class ParkingGroupsEntity extends ZCoreBase {
  public parking_group_ids: string; // 停车场分组id集合，用,分割
}

export class BasicParkingSearchParams {
  public parking_id: string; // 停车场编码
  public parking_name: string; // 停车场名称
  public status: number; // 是否正常 1:正常, 2: 已注销
  public region_id: string; // 省市区code
  public address: string; // 详细地址
  public page_num: number; // 页码
  public page_size: number; // 每页条数
}

export class ParkingBasicInfoEntity extends ZCoreBase {
  public parking_id: string; // String	停车场ID
  public parking_name: string; // String	停车场名称
  public address: string; // 地址
  public lon: string;
  public lat: string;
  public area_type: number; // 状态 1:路内 2:路外
  public first_operate_time: number; // 首次运营时间
  public charging_pile: boolean; // 是否有充电桩
  public parking_kind: number;
  public operate_type: number;
  public parking_category: number;
  public operation_start_time: number;
  public opening_type: number;
  public pay_type: number;
  public company_name: string;
  public platform_name: string;
  public operation_end_time: number;

  public get firstOperationTime() {
    if (isNullOrUndefined(this.first_operate_time)) {
      return '-- ';
    }
    return DateFormatHelper.Format(this.first_operate_time * 1000);
  }
}

export class ParkingRelationEntity extends ZCoreBase {
  public parking_name: string;
  public parking_id: string;
  public parking_relation: ParkingRelationDetailEntity = new ParkingRelationDetailEntity();
  public company: CompanyEntity;
  public images: Array<string>; // 图片集
  public platform: ManufacturerPlatFormEntity;
  public status: number; // deprecated 状态 1:正常, 2: 已注销

  @nonEnumerable
  public get companyName(): string {
    const name = this.company && this.company && this.company.company_name;
    return name;
  }

  @nonEnumerable
  public get platformName(): string {
    const name = this.platform && this.platform && this.platform.platform_name;
    return name;
  }

  @nonEnumerable
  public get manufacturerName(): string {
    const name = this.platform && this.platform && this.platform.manufacturer && this.platform.manufacturer.manufacturer_name;
    return name;
  }

  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'company') {
      return ParkingCompanyEntity;
    } else if (propertyName === 'platform') {
      return ManufacturerPlatFormEntity;
    } else if (propertyName === 'parking_relation') {
      return ParkingRelationDetailEntity;
    }
    return null;
  }
}

export class ParkingRelationDetailEntity extends ZCoreBase {
  public start_time: number; // 运营开始时间
  public parking_relation_id: string;
  public end_time: number; // 运营结束时间
}
