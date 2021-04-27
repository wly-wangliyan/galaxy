import {Component} from '@angular/core';
import {GroupsHttpService} from './groups-http.service';
import {GroupsDataService} from './groups-data.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
  providers: [GroupsHttpService, GroupsDataService]
})

export class GroupsComponent {
}
