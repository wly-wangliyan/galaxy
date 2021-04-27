import {Component} from '@angular/core';
import {OperationCompanyHttpService} from './operation-company-http.service';
import {DataCacheService} from '../../../core/data-cache.service';

@Component({
  selector: 'app-operation-company',
  templateUrl: './operation-company.component.html',
  styleUrls: ['./operation-company.component.css'],
  providers: [OperationCompanyHttpService, DataCacheService]
})
export class OperationCompanyComponent {
}
