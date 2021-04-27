import {ZCoreBase} from '../../../../utils/z-core';
import {UserEntity} from '../../../core/auth.service';

export class CompaniesSearchParams {
  public username: string; // 用户名
  public company_name: string; // 物业公司名称
  public contacts: string; // 联系人
  public telephone: string; // 联系电话
  public page_num: number; // 页码
  public page_size: number; // 每页条数
}

export class FuzzySearchCompaniesParams {
  public company_name: string; // 物业公司名称
  public limit: number; // 返回条数
}

export class CompanyEntity extends ZCoreBase {
  public company_id: string; // 物业公司id
  public company_name: string; // 物业公司名称
  public region_id: string; // 省市区code
  public address: string; // 详细地址
  public person: string; // 法人
  public contacts: string; // 联系人
  public telephone: string; // 联系电话
  public licence_num: string; // 营业执照
  public licence_photos: Array<string>; // 营业执照照片
  public updated_time: number; // 更新时间
  public created_time: number; // 创建时间
  public user: UserEntity;
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

export class CompanyBasicInfoEntity extends ZCoreBase {
  public company_id: string; // String	公司ID
  public company_name: string; // String	公司名称
}
