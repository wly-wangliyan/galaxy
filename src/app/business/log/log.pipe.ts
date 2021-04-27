import { Pipe, PipeTransform } from '@angular/core';

const valueObj = {
  'parking_record_export': '导出停车记录',
  'create_user': '添加员工',
  'update_user' : '编辑员工信息'
};

@Pipe({
  name: 'operationType'
})
export class LogPipe implements PipeTransform {

  public transform(value: any, args?: any): any {
    return (valueObj[value] ? valueObj[value] : '');
  }
}

const editInfo = {
  'department': '部门',
  'email': '邮箱',
  'realname' : '姓名',
  'remarks' : '备注',
  'telephone' : '联系方式',
  'permission_groups' : '权限'
};

@Pipe({
  name: 'editInfoPipe'
})
export class EditInfoPipe implements PipeTransform {

  public transform(value: any, args?: any): any {
    return (editInfo[value] ? editInfo[value] : '');
  }
}
