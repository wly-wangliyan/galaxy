import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ParkingEntity} from '../parkings/parkings.model';

@Injectable()
export class GroupsDataService {

  private cacheObj: any;

  /**
   * 设置缓存数据
   * @param dataProvider 数据提供者
   * @param propertyKeys 需要缓存的字段
   */
  public setCache(dataProvider: any, ...propertyKeys: string[]) {
    this.cacheObj = {};
    propertyKeys.forEach(key => {
      this.cacheObj[key] = dataProvider[key];
    });
  }

  /**
   * 获取缓存数据
   * @returns {any}
   */
  public getCache(): Observable<any> {
    return Observable.create(observer => {
      const tmpCache = this.cacheObj;
      this.cacheObj = null;
      observer.next(tmpCache);
      observer.complete();
    });
  }

  /**
   * 当缓存数据不再适用时需要清空时调用
   */
  public clear() {
    this.cacheObj = null;
  }
}

export class ParkingItem {

  public source: ParkingEntity;

  public isChecked = false;

  constructor(source: ParkingEntity) {
    this.source = source;
  }
}
