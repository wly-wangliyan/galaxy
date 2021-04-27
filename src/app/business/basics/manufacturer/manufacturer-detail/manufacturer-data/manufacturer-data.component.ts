import {Component, OnInit} from '@angular/core';
import {ManufacturerHttpService} from '../../manufacturer-http.service';
import {ActivatedRoute} from '@angular/router';
import {GlobalService} from '../../../../../core/global.service';
import {ManufacturerEntity} from '../../manufacturer.model';

@Component({
  selector: 'app-manufacturer-data',
  templateUrl: './manufacturer-data.component.html',
  styleUrls: ['./manufacturer-data.component.css']
})
export class ManufacturerDataComponent implements OnInit {

  public manufacturer: ManufacturerEntity = new ManufacturerEntity();

  private manufacturer_id: string;

  constructor(private route: ActivatedRoute, private manufacturerHttpService: ManufacturerHttpService, private globalService: GlobalService) {
    this.route.parent.params.subscribe(params => {
      this.manufacturer_id = params['manufacturer_id'];
    });
  }

  public ngOnInit() {
    this.manufacturerHttpService.requestManufacturerById(this.manufacturer_id).subscribe(data => {
      this.manufacturer = data;
    }, err => {
      this.globalService.httpErrorProcess(err);
    });
  }
}
