import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './business/home/home.component';
import {AuthGuardService} from './core/auth-guard.service';
import {LoginComponent} from './business/login/login.component';
import {BasicsComponent} from './business/basics/basics.component';
import {RouteMonitorService} from './core/route-monitor.service';
import {AppComponent} from './app.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [AuthGuardService]},
  {
    path: '', component: AppComponent, children: [
      {path: '', redirectTo: '/home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent, canActivate: [AuthGuardService, RouteMonitorService]},
      {
        path: 'real-time-statistics',
        loadChildren: './business/real-time-statistics/real-time-statistics.module#RealTimeStatisticsModule',
        canLoad: [AuthGuardService]
      },
      {
        path: 'data-statistics',
        loadChildren: './business/data-statistics/data-statistics.module#DataStatisticsModule',
        canLoad: [AuthGuardService]
      },
      {
        path: 'records',
        loadChildren: './business/data-records/data-records.module#DataRecordsModule',
        canLoad: [AuthGuardService]
      },
      {
        path: 'exceptions',
        loadChildren: './business/exceptions/exceptions.module#ExceptionsModule',
        canLoad: [AuthGuardService]
      },
      {
        path: 'basics', component: BasicsComponent,
        children: [
          {path: '', redirectTo: 'operation', pathMatch: 'full'},
          {
            path: 'parkings',
            loadChildren: './business/parkings/parkings.module#ParkingsModule',
            canLoad: [AuthGuardService]
          },
          {
            path: 'companies',
            loadChildren: './business/basics/operation-company/operation-company.module#OperationCompanyModule',
            canLoad: [AuthGuardService]
          },
          {
            path: 'manufacturers',
            loadChildren: './business/basics/manufacturer/manufacturer.module#ManufacturerModule',
            canLoad: [AuthGuardService]
          },
          {path: '**', redirectTo: 'operation'},
        ]
      },
      {
        path: 'employees',
        loadChildren: './business/employees/employees.module#EmployeesModule',
        canLoad: [AuthGuardService]
      },
      {
        path: 'log',
        loadChildren: './business/log/log.module#LogModule',
        canLoad: [AuthGuardService]
      },
      // {
      //   path: 'beian',
      //   loadChildren: './business/beian/beian.module#BeianModule',
      //   canLoad: [AuthGuardService]
      // },
      {path: '**', redirectTo: '/home', pathMatch: 'full'},
    ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
