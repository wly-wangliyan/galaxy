import {NgModule} from '@angular/core';
import {ShareModule} from '../../share/share.module';
import {ParkingsRoutingModule} from './parkings-routing.module';
import {ParkingsComponent} from './parkings.component';
import {ParkingsAddComponent} from './parkings-add/parkings-add.component';
import {BasicInfoComponent} from './parkings-add/basic-info/basic-info.component';
import {SelectGroupsComponent} from './parkings-add/select-groups/select-groups.component';
import {ParkingsListComponent} from './parkings-list/parkings-list.component';
import {ParkingsEditComponent} from './parkings-edit/parkings-edit.component';
import {EditBasicInfoComponent} from './parkings-edit/basic-info/basic-info.component';
import {EditOperationRelationComponent} from './parkings-edit/operation-relation/operation-relation.component';
import {EditSelectGroupsComponent} from './parkings-edit/select-groups/select-groups.component';
import {ParkingUpdateRecordComponent} from './parking-update-record/parking-update-record.component';

@NgModule({
  imports: [
    ShareModule,
    ParkingsRoutingModule,
  ],
  declarations: [ParkingsComponent,
    ParkingsAddComponent,
    BasicInfoComponent,
    SelectGroupsComponent,
    ParkingsListComponent,
    ParkingsEditComponent,
    EditBasicInfoComponent,
    EditOperationRelationComponent,
    EditSelectGroupsComponent,
    ParkingUpdateRecordComponent
  ]
})
export class ParkingsModule {
}
