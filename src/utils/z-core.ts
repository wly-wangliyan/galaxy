/**
 * Created by zack on 9/11/17.
 */

import {isNullOrUndefined, isNull} from 'util';

class ZCoreConst {

  /**
   * 通过json获取类实例
   * @param json json对象
   * @param Class 目标对象类(必须继承自CoreBase)
   */
  public entity(json: any, cClass: any): any {
    const entity = new cClass();
    if (entity instanceof ZCoreBase) {
      this.recursiveParse(entity, json);
      return entity;
    } else {
      throw new Error('Class must extends ZCoreBase. by zwl');
    }
  }

  /**
   * 克隆对象
   * @param entity 对象
   * @param Class 类
   * @returns {any} 新对象
   */
  public clone(entity: ZCoreBase, cClass: any): any {
    return this.entity(entity, cClass);
  }

  /**
   * 将对象转换成json
   * @param entity 对象
   * @returns {any}
   */
  public json(entity: ZCoreBase): any {

    const obj: any = {};
    const skips = entity.skipProperties();
    for (const propName in entity) {
      if (!entity.hasOwnProperty(propName)) {
        continue;
      }

      // 跳过
      const index = skips.findIndex((prop) => {
        return prop === propName;
      });

      if (index >= 0) {
        continue;
      }

      const propValue = entity[propName];
      if (isNullOrUndefined(propValue)) {
        // 无效值跳过
        continue;
      }

      if (typeof propValue === 'function') {
        // 方法不处理
        continue;
      } else if (typeof propValue === 'string'
        || typeof propValue === 'number'
        || typeof propValue === 'boolean') {
        // 基础类型直接赋值
        obj[propName] = propValue;
      } else if (Object.prototype.toString.call(propValue) === '[object Array]') {
        obj[propName] = [];
        propValue.forEach(item => {
          if (item instanceof ZCoreBase) {
            const temp = item.json();
            obj[propName].push(temp);
          }
        });
        if (propValue.length > 0 && obj[propName].length === 0) {
          // 解析失败则认为目标类型为json
          obj[propName] = JSON.parse(JSON.stringify(propValue));
        }
      } else if (propValue instanceof ZCoreBase) {
        obj[propName] = propValue.json();
      } else {
        // 无法识别则认为就是json,直接赋值
        obj[propName] = JSON.parse(JSON.stringify(propValue));
      }
    }
    return obj;
  }

  /**
   * 递归解析数据
   * @param target 目标对象实例
   * @param source json对象
   */
  private recursiveParse(target: any, source: any) {
    for (const propName in source) {
      if (!source.hasOwnProperty(propName)) {
        continue;
      }

      const propValue = source[propName];

      if (typeof propValue === 'function') {
        // 方法不需要处理
        continue;
      } else if (typeof propValue === 'string'
        || typeof propValue === 'number'
        || typeof propValue === 'boolean') {
        // 基础值类型直接复制
        target[propName] = propValue;
      } else if (Object.prototype.toString.call(propValue) === '[object Array]') {
        // 值为数组时需要将原数组初始化
        target[propName] = [];
        const cClass = target.getPropertyClass(propName);
        if (target instanceof ZCoreBase && cClass) {
          for (const value of propValue) {
            target[propName].push(this.entity(value, cClass));
          }
        } else {
          target[propName] = propValue;
        }
      } else if (isNull(propValue)) {
        // 值为空时如果原数据重写getPropertyClass,则进行初始化,否则保持原样
        const cClass = target.getPropertyClass(propName);
        if ((target instanceof ZCoreBase) && cClass) {
          target[propName] = this.entity(propValue, cClass);
        } else {
          // 为空则保持原数据的状态
        }
      } else {
        // 值为json时如果有对应的类则初始化类
        const cClass = target.getPropertyClass(propName);
        if ((target instanceof ZCoreBase) && cClass) {
          target[propName] = this.entity(propValue, cClass);
        } else {
          target[propName] = propValue;

          // 单一对象需要重写类名方法让基类识别,才能保持结构化一致
          console.warn('You can override getPropertyClass to make your code more structured. by zwl');
        }
      }
    }
  }
}

const ZCORE: ZCoreConst = new ZCoreConst();

export abstract class ZCoreBase {

  /**
   * 通过json创建对象实例
   * @param json json对象
   * @returns {any} 目标实例
   */
  public static Create(json: any): any {
    return ZCORE.entity(json, this);
  }

  /**
   * 克隆当前类对象
   * @returns {any}
   */
  public clone(): any {
    return ZCORE.clone(this, this.constructor);
  }

  /**
   * 转json对象
   * @returns {any}
   */
  public json(): any {
    return ZCORE.json(this);
  }

  /**
   * 获取引用对象对应的类型
   * @param propertyName 属性名
   * @returns {null}返回的类型必须继承自ZCoreBase
   */
  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    return null;
  }

  /**
   * 转json对象时跳过的属性,通过重写此方法可实现跳过属性解析
   * @returns {Array} 跳过的属性列表
   */
  public skipProperties(): Array<string> {
    return [];
  }
}

/* 装饰器 */
/*
 * sample
 * // class A {
 //   a: number = 1;
 //
 //   @nonEnumerable
 //   get c(): number {
 //     return 1;
 //   }
 // }
 * */

/**
 * 不可枚举装饰器
 * @param target 目标对象
 * @param name 属性名称
 * @param descriptor 属性描述
 * @returns {any}
 */
export function nonEnumerable(target, name, descriptor) {
  descriptor.enumerable = false;
  return descriptor;
}
