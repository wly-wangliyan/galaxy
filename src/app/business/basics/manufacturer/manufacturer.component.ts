import {Component} from '@angular/core';
import {DataCacheService} from '../../../core/data-cache.service';
import {ManufacturerHttpService} from './manufacturer-http.service';

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.css'],
  providers: [DataCacheService, ManufacturerHttpService]
})
export class ManufacturerComponent {
}
