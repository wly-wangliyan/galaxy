import {GroupBasicInfoEntity} from '../data-statistics/data-statistics.model';
import {UserEntity} from '../../core/auth.service';
import {nonEnumerable, ZCoreBase} from '../../../utils/z-core';
import {ParkingEntity} from '../parkings/parkings.model';
import {CompanyBasicInfoEntity} from '../basics/operation-company/operation-company.model';
import {ManufacturerEntity, ManufacturerPlatFormEntity} from '../basics/manufacturer/manufacturer.model';

export enum ExamineType {
  checkPending,
  checked,
  notPass
}

export class ParkingBeianBase extends ZCoreBase {
  public parking: ParkingEntity;
  public parking_beian_id: string; // |String|停车场备案记录id
  public parking_id: string; // |String|停车场id/编号
  public parking_name: string; // |String|停车场名称
  public province: string; // |String|省
  public city: string; // |String|市
  public district: string; // |String|区
  public region_id: string; // |String|行政区域code
  public address: string; // |String|地址
  public lon: string; // |String|经度
  public lat: string; // |String|纬度
  public area_type: number; // |int|用地类型 1:路内 2:路外
  public parking_type: Array<string>; // deprecated |array|停车场类型 1:地上停车场 2:桥下停车场 3:地下停车场 4:停车楼 5:立体车库 0:其他
  public parking_category: number; // 1:停车楼 2:地下停车场 3:地面停车场 6:立体停车场 8:地面+地下停车场 9:地面+停车楼 10:地面+地下+停车楼
  public company_name: string; // |String|公司名称
  public contacts: string; // |String|联系人
  public telephone: string; // |String|联系电话
  public images: Array<string>; // |array|图片集
  public parking_groups: Array<GroupBasicInfoEntity>; // |array|停车场分组
  public company: CompanyBasicInfoEntity; // |object|运营/物业公司id

  public user: UserEntity; // |User|审核人
  public reviewed_time: number; // |Float|审核时间
  public status: number; // |Int|审核状态(1:待审核,2:未通过,3:已放弃,4:已通过,5:已失效)
  public failed_reason: string; // |String|审核失败原因
  public flag: boolean; // |boolean|备案记录是否有效(true:有效,false:失效)
  public updated_time: number; // |Float|更新时间
  public created_time: number; // |Float|创建时间
  public start_time: number; // Float	备案有效开始时间
  public end_time: number; // Float	备案有效结束时间
  public remarks: string; // String 成功的备注

  @nonEnumerable
  public get companyId(): string {
    const id = this.company && this.company.company_id;
    return id;
  }

  @nonEnumerable
  public get companyName(): string {
    const name = this.company && this.company.company_name;
    return name;
  }

  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    switch (propertyName) {
      case 'ParkingEntity':
        return ParkingEntity;
      case 'user':
        return UserEntity;
      case 'parking_groups':
        return GroupBasicInfoEntity;
      case 'company':
        return CompanyBasicInfoEntity;
      case 'platform':
        return ManufacturerPlatFormEntity;
      case 'parking_platform':
        return ManufacturerPlatFormEntity;
      case 'parking':
        return ParkingEntity;
    }
    return super.getPropertyClass(propertyName);
  }
}

export class ParkingBeianEntity extends ParkingBeianBase {
  public platform: ManufacturerPlatFormEntity; // |object|管理系统id

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
    const name = this.platform && this.platform.platform_name;
    return name;
  }

  @nonEnumerable
  public get manufacturerName(): string {
    const name = this.platform && this.platform.manufacturer && this.platform.manufacturer.manufacturer_name;
    return name;
  }

  @nonEnumerable
  public get manufacturerId(): string {
    const id = this.platform && this.platform.manufacturer && this.platform.manufacturer && this.platform.manufacturer.manufacturer_id;
    return id;
  }

}

export class CompanyParkingBeianEntity extends ParkingBeianBase {
  public parking_platform: ManufacturerPlatFormEntity;

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
    const name = this.parking_platform && this.parking_platform.platform_name;
    return name;
  }

  @nonEnumerable
  public get manufacturerName(): string {
    const name = this.parking_platform && this.parking_platform.manufacturer && this.parking_platform.manufacturer.manufacturer_name;
    return name;
  }

  @nonEnumerable
  public get manufacturerId(): string {
    const id = this.parking_platform && this.parking_platform.manufacturer && this.parking_platform.manufacturer && this.parking_platform.manufacturer.manufacturer_id;
    return id;
  }
}

export class ParkingBeianSearchParams {
  public parking_name: string; // String	F	停车场名称
  public company_name: string; // String	F	运营/物业公司
  public manufacturer_name: string; // String	F	系统厂商
  public platform_name: string; // String	F	管理系统
  public section: string; // String	F	提交/审核时间戳范围
  public status: string; // status	F	状态 1:运营中 2:未运营 3:运营过期
  public page_num: number; // int	F	页码 默认 1
  public page_size: number; // int	F	每页条数 默认 20
  public order_by: string; // String	F	排序 -created_time:按提交时间，-reviewed_time:按审核时间
  public realname: string; // String	F 审核人
}

export class PlatformBeianEntity extends ZCoreBase {
  public platform_beian_id: string; // |String|收费系统备案id
  public manufacturer: ManufacturerEntity; // |object|所属厂商
  public platform_name: string; // |String|收费系统名称
  public authority_num: string; // |String|软著权编码
  public authority_images: string; // |String|软著权资质
  public user: UserEntity; // |Object|审核人
  public reviewed_time: number; // |Float|审核时间
  public reviewed_status: number; // |Int|审核状态(1:待审核,2:未通过,3:已放弃,4:已通过)
  public failed_reason: string; // |String|审核失败原因
  public remarks: string; // |String|备注
  public flag: boolean; // |Int|备案记录是否有效(True:有效,False:失效)
  public updated_time: number; // |Float|更新时间
  public created_time: number; // |Float|创建时间

  @nonEnumerable
  public get manufacturerName(): string {
    const name = this.manufacturer && this.manufacturer.manufacturer_name;
    return name;
  }

  @nonEnumerable
  public get manufacturerId(): string {
    const id = this.manufacturer && this.manufacturer && this.manufacturer.manufacturer_id;
    return id;
  }

  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    switch (propertyName) {
      case 'user':
        return UserEntity;
      case 'manufacturer':
        return ManufacturerEntity;
    }
    return super.getPropertyClass(propertyName);
  }
}

export class PlatformBeianSearchParams {
  public reviewed_status: Array<number> = []; // Int	F	审核状态(1:待审核,2:未通过,3:已放弃,4:已通过)
  public manufacturer_name: string; // String	F	厂商名称
  public platform_name: string; // String	F	系统名称
  public section: string; // String	F	提交/审核时间区间
  public realname: string; // String	F 审核人
  public order_by: string; // String	F	排序 -created_time:按提交时间，-reviewed_time:按审核时间
}

export class ParkingBeianInfoAuditSearchParams extends ZCoreBase {
  public status: number; // Int T	审核状态(1:已通过 2:未通过)
  public failed_reason: string; // String F 失败原因
  public remarks: string; // String 成功备注
}

export class PlatformAuditBeianSearchParams extends ZCoreBase {
  public status: number;  // Int	T	审核状态(1:已通过 2:未通过)
  public failed_reason: string; // String	F	失败原因
  public remarks: string; // String F 成功备注
}
