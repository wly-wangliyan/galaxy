import {Component} from '@angular/core';
import {BeianHttpService} from './beian-http.service';
import {DataCacheService} from '../../core/data-cache.service';

@Component({
  selector: 'app-beian',
  templateUrl: './beian.component.html',
  styleUrls: ['./beian.component.css'],
  providers: [BeianHttpService, DataCacheService]
})
export class BeianComponent {
}
