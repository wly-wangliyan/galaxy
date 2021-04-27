import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {OperationCompanyComponent} from './operation-company.component';
import {AuthGuardService} from '../../../core/auth-guard.service';
import {OperationCompanyListComponent} from './operation-company-list/operation-company-list.component';
import {OperationCompanyDetailComponent} from './operation-company-detail/operation-company-detail.component';
import {RouteMonitorService} from '../../../core/route-monitor.service';
import {OperationCompanyDataComponent} from './operation-company-detail/operation-company-data/operation-company-data.component';
import {OperationCompanyParkingComponent} from './operation-company-detail/operation-company-parking/operation-company-parking.component';

@NgModule({
  imports: [RouterModule.forChild([{
    path: '', component: OperationCompanyComponent,
    canActivateChild: [AuthGuardService, RouteMonitorService],
    children: [
      {path: '', component: OperationCompanyListComponent},
      {
        path: 'detail/:company_id', component: OperationCompanyDetailComponent,
        canActivateChild: [AuthGuardService, RouteMonitorService],
        children: [
          {path: '', redirectTo: 'data', pathMatch: 'full'},
          {path: 'data', component: OperationCompanyDataComponent},
          {path: 'parkings', component: OperationCompanyParkingComponent},
          {path: '**', redirectTo: ''}
        ]
      },
      {path: '**', redirectTo: ''}
    ]
  }])],
  exports: [RouterModule],
})
export class OperationCompanyRoutingModule {
}
