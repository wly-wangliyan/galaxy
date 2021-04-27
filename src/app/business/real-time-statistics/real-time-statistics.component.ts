import {Component} from '@angular/core';
import {DataStatisticsHttpService} from '../data-statistics/data-statistics-http.service';
import {GroupsHttpService} from '../groups/groups-http.service';

@Component({
  selector: 'app-real-time-statistics',
  templateUrl: './real-time-statistics.component.html',
  styleUrls: ['./real-time-statistics.component.css', '../../share/css/tab-bar.css'],
  providers: [DataStatisticsHttpService, GroupsHttpService]
})
export class RealTimeStatisticsComponent {
}
