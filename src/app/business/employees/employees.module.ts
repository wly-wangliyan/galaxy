import {NgModule} from '@angular/core';
import {ShareModule} from '../../share/share.module';
import {EmployeesRoutingModule} from './employees-routing.module';
import {EmployeesComponent} from './employees.component';
import {EmployeesListComponent} from './employees-list/employees-list.component';
import {EmployeesAddComponent} from './employees-add/employees-add.component';
import {EmployeesEditComponent} from './employees-edit/employees-edit.component';
import {EmployeesDetailComponent} from './employees-detail/employees-detail.component';

@NgModule({
  imports: [
    ShareModule,
    EmployeesRoutingModule
  ],
  declarations: [EmployeesComponent, EmployeesListComponent, EmployeesAddComponent, EmployeesEditComponent, EmployeesDetailComponent]
})
export class EmployeesModule {
}
