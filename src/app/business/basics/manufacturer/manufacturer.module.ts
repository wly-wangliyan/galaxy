import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManufacturerListComponent} from './manufacturer-list/manufacturer-list.component';
import {ManufacturerDetailComponent} from './manufacturer-detail/manufacturer-detail.component';
import {ManufacturerDataComponent} from './manufacturer-detail/manufacturer-data/manufacturer-data.component';
import {ManufacturerParkingComponent} from './manufacturer-detail/manufacturer-parking/manufacturer-parking.component';
import {ManufacturerPlatformComponent} from './manufacturer-detail/manufacturer-platform/manufacturer-platform.component';
import {ManufacturerComponent} from './manufacturer.component';
import {ShareModule} from '../../../share/share.module';
import {ManufacturerRoutingModule} from './manufacturer-routing.module';

@NgModule({
  imports: [
    ShareModule,
    ManufacturerRoutingModule,
  ],
  declarations: [ManufacturerListComponent, ManufacturerDetailComponent, ManufacturerDataComponent, ManufacturerParkingComponent, ManufacturerPlatformComponent, ManufacturerComponent]
})
export class ManufacturerModule {
}
