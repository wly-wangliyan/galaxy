import {NgModule} from '@angular/core';
import {GroupsComponent} from './groups.component';
import {GroupsAddComponent} from './groups-add/groups-add.component';
import {GroupsDetailComponent} from './groups-detail/groups-detail.component';
import {GroupsEditComponent} from './groups-edit/groups-edit.component';
import {GroupsListComponent} from './groups-list/groups-list.component';
import {GroupsRoutingModule} from './groups-routing.module';
import {ShareModule} from '../../share/share.module';

@NgModule({
  imports: [
    ShareModule,
    GroupsRoutingModule
  ],
  declarations: [GroupsComponent, GroupsAddComponent, GroupsDetailComponent, GroupsEditComponent, GroupsListComponent]
})
export class GroupsModule {
}
