import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/Observable';
import { ZCoreBase } from '../../utils/z-core';
import { environment } from '../../environments/environment';

export enum RegionLevel {
  province = 1,
  city = 2,
  district = 3,
}

export class RegionEntity extends ZCoreBase {
  public parent_id: string;
  public name: string;
  public region_id: string;
  public level: RegionLevel;
  public center: string; // '124.0000,24.0000'
  public cities: Array<RegionEntity>;
  public districts: Array<RegionEntity>;

  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'districts') {
      return RegionEntity;
    } else if (propertyName === 'cities') {
      return RegionEntity;
    }
    return null;
  }
}

@Injectable()
export class RegionHttpService {

  constructor(private httpService: HttpService) {
  }

  /**
   * 请求行政区域列表
   * @param region_id 区域id
   * @returns {Observable<R>}
   */
  public requestRegions(region_id?: string): Observable<Array<RegionEntity>> {
    return this.httpService.get(environment.CIPP_UNIVERSE + '/regions', this.httpService.generateURLSearchParams({ region_id: region_id })).map(data => {
      const json = data.json();
      const regions = [];
      json.forEach(jsonObj => {
        regions.push(RegionEntity.Create(jsonObj));
      });
      return regions;
    });
  }
}
