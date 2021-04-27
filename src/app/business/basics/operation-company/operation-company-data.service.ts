import {Injectable} from '@angular/core';
import {GlobalService} from '../../../core/global.service';
import {ValidateHelper} from '../../../../utils/validate-helper';
import {CompanyEntity} from './operation-company.model';

@Injectable()
export class OperationCompanyDataService {

  constructor(private globalService: GlobalService) {
  }

  /**
   * 检查数据是否正确有效
   * @param companiesParams
   * @returns {boolean}
   */
  public generateAndCheckParamsValid(companiesParams: CompanyEntity): boolean {
    if (companiesParams.telephone) {
      const phoneNumbers = companiesParams.telephone.split(',');
      for (const phoneNumber of phoneNumbers) {
        if (!ValidateHelper.Phone(phoneNumber)) {
          this.globalService.promptBox.open('联系方式格式错误，请重新输入！');
          return false;
        }
      }
    }

    return true;
  }
}
