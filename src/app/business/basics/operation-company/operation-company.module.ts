import {NgModule} from '@angular/core';
import {OperationCompanyListComponent} from './operation-company-list/operation-company-list.component';
import {OperationCompanyDetailComponent} from './operation-company-detail/operation-company-detail.component';
import {OperationCompanyComponent} from './operation-company.component';
import {ShareModule} from '../../../share/share.module';
import {OperationCompanyRoutingModule} from './operation-company-routing.module';
import {OperationParkingComponent} from './operation-parking/operation-parking.component';
import {OperationCompanyDataComponent} from './operation-company-detail/operation-company-data/operation-company-data.component';
import {OperationCompanyParkingComponent} from './operation-company-detail/operation-company-parking/operation-company-parking.component';

@NgModule({
  imports: [
    ShareModule,
    OperationCompanyRoutingModule
  ],
  declarations: [
    OperationCompanyComponent,
    OperationCompanyListComponent,
    OperationCompanyDetailComponent,
    OperationParkingComponent,
    OperationCompanyDataComponent,
    OperationCompanyParkingComponent
  ]
})
export class OperationCompanyModule {
}
