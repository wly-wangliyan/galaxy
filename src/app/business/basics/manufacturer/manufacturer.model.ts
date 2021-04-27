import {ZCoreBase} from '../../../../utils/z-core';
import {UserEntity} from '../../../core/auth.service';

export class ManufacturerSearchParams {
  public username: string; // String	F	用户名
  public manufacturer_name: string; // String	F	系统厂商名称
  public contacts: string; // String	F	联系人
  public telephone: string; // String	F	联系电话
  public page_num: number; // Int	F	页码
  public page_size: number; // Int	F	每页条数
}

export class PlatformOnlineSearchParams {
  public is_online = 'true'; // Bool	F	在线状态(True:在线,False:下线)
  public parking_name: string; // String	F	停车场名称
  public platform_name: string; // String	F	管理系统名称
  public page_num: number; // Int	F	页码
  public page_size: number; // Int	F	每页条数
}

export class ManufacturerBasicInfoEntity extends ZCoreBase {
  public manufacturer_id = ''; // String	系统厂商id
  public manufacturer_name = ''; // String	系统厂商名称
  public contacts = ''; // String	联系人
  public telephone = ''; // String	联系电话
  public created_time: number; // Float	创建时间/注册时间
  public user: UserEntity; // User 已绑定用户

  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'user') {
      return UserEntity;
    }
    return super.getPropertyClass(propertyName);
  }
}

export class ManufacturerEntity extends ZCoreBase {
  public manufacturer_id = ''; // String	系统厂商id
  public user: UserEntity; // User	已绑定用户
  public manufacturer_name = ''; // String	系统厂商名称
  public region_id: string; // String	省市区code
  public address = ''; // String	详细地址
  public person = ''; // String	法人
  public contacts = ''; // String	联系人
  public telephone = ''; // String	联系电话
  public licence_num = ''; // String	营业执照编号
  public licence_photos: Array<string>; // String	营业执照照片
  public is_deleted: boolean; // Bool	厂商状态
  public updated_time: number; // Float	更新时间
  public created_time: number; // Float	创建时间/注册时间
  public lon: string; // 经度
  public lat: string; // 纬度
  public province: string; // 省
  public city: string; // 市
  public district: string; // 区

  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'user') {
      return UserEntity;
    }
    return super.getPropertyClass(propertyName);
  }
}

export class ManufacturerPlatFormEntity extends ZCoreBase {
  public platform_id: string; // String	收费系统id
  public manufacturer: ManufacturerBasicInfoEntity; // Manufacturer 所属厂商
  public platform_name: string; // String	收费系统名称
  public authority_num: string; // String	软著权编码
  public authority_images: Array<string>; // array	软著权资质
  public client_id: string; // String	授权帐号
  public client_secret: string; // String	授权秘钥
  public updated_time: number; // Float	更新时间
  public created_time: number; // Float	创建时间
  public user: UserEntity;

  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'manufacturer') {
      return ManufacturerBasicInfoEntity;
    } else if (propertyName === 'user') {
      return UserEntity;
    }
    return super.getPropertyClass(propertyName);
  }
}

export class PlatformOnlineEntity extends ZCoreBase {
  public platform_online_id: string; // String	收费系统线上id
  public platform: ManufacturerPlatFormEntity; // Platform	收费系统
  public parking: ParkingBasicInfoEntity; // Parking	停车场
  public is_online: boolean; // Bool	在线状态
  public online_time: number; // Float	在线时间
  public offline_time: number; // Float	下线时间
  public updated_time: number; // Float	更新时间
  public created_time: number; // Float	创建时间
  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'platform') {
      return ManufacturerPlatFormEntity;
    } else if (propertyName === 'parking') {
      return ParkingBasicInfoEntity;
    }
    return super.getPropertyClass(propertyName);
  }
}

export class PlatformBasicInfoEntity extends ZCoreBase {
  public platform_id: string; // String	收费系统ID
  public platform_name: string; // String	收费系统名称
}

export class ParkingBasicInfoEntity extends ZCoreBase {
  public parking_id: string; // String	停车场ID
  public parking_name: string; // String	停车场名称
  public address: string; // 地址
  public lon: string;
  public lat: string;
}
