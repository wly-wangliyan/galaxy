import {Component, OnInit, ViewChild} from '@angular/core';
import {GlobalService} from '../../../core/global.service';
import {EmployeesHttpService, UserEditParams} from '../employees-http.service';
import {Router, ActivatedRoute} from '@angular/router';
import {EmployeesDataService, PermissionItem} from '../employees-data.service';
import {DataCacheService} from '../../../core/data-cache.service';
import {HttpErrorEntity} from '../../../core/http.service';
import {CanDeactivateComponent} from '../../../share/interfaces/can-deactivate-component';
import {CheckboxState} from '../../../share/components/beautify-checkbox/beautify-checkbox.component';

@Component({
  selector: 'app-employees-add',
  templateUrl: './employees-add.component.html',
  styleUrls: ['./employees-add.component.css'],
  providers: [EmployeesDataService]
})
export class EmployeesAddComponent implements OnInit, CanDeactivateComponent {

  public userParams: UserEditParams = new UserEditParams();

  public permissionList: Array<PermissionItem> = [];

  @ViewChild('editEmployeeForm') public editEmployeeForm: any;

  private editSuccess = false; // 编辑是否成功

  /**
   * 获取是否有权限被选中了(表单校验)
   * @returns {boolean}
   */
  public get permissionChecked(): boolean {
    for (const permission of this.permissionList) {
      if (permission.isChecked) {
        return true;
      }
    }
    return false;
  }

  public exportParkRecordItem: PermissionItem;

  public isViewExportItem: boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private globalService: GlobalService,
              private dataCacheService: DataCacheService,
              private httpService: EmployeesHttpService,
              private dataService: EmployeesDataService) {
  }

  public ngOnInit() {
    this.globalService.permissionGroups.subscribe(groups => {
      this.permissionList = [];
      groups.forEach(group => {
        if (group.english_name === 'parking_record_export') {
          this.exportParkRecordItem = new PermissionItem(group);
        } else {
          this.permissionList.push(new PermissionItem(group));
        }
      });
    }, err => {
      this.globalService.httpErrorProcess(err);
    });
  }

  public onPermissionChange(event) {
    const permission = event[1];
    permission.isChecked = event[0] === CheckboxState.checked ? true : false;
    if (permission.source.english_name === 'data_record' && permission.isChecked) {
      this.isViewExportItem = true;
    } else if (permission.source.english_name === 'data_record' && permission.isChecked === false) {
      this.isViewExportItem = false;
      this.exportParkRecordItem.isChecked = false;
    }
  }

  public onEditEmployeeFormSubmit() {
    if (!this.dataService.generateAndCheckParamsValid(this.userParams, this.permissionList)) {
      return;
    }
    if (this.exportParkRecordItem.isChecked) {
      console.log(this.exportParkRecordItem);
      // this.exportParkRecordItem.source.permission_group_id
      this.userParams.permission_groups.push(this.exportParkRecordItem.source.permission_group_id);
    }

    this.httpService.requestAddUser(this.userParams).subscribe(() => {
      this.globalService.promptBox.open('添加成功，密码已下发到员工邮箱！', () => {
        this.editSuccess = true;
        this.dataCacheService.clear();
        this.router.navigate(['../'], {relativeTo: this.route});
      });
    }, err => {
      if (!this.globalService.httpErrorProcess(err)) {
        if (err.status === 422) {
          const error: HttpErrorEntity = HttpErrorEntity.Create(err.json());

          for (const content of error.errors) {
            if (content.resource === 'user' && content.code === 'already_exist') {
              this.globalService.promptBox.open('该账号已存在，请重新输入');
              return;
            }
          }
        }
      }
    });
  }

  public canDeactivate(): boolean {
    return this.editSuccess || !this.editEmployeeForm || !this.editEmployeeForm.dirty;
  }
}
