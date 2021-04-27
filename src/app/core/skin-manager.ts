/**
 * Created by zack on 29/1/18.
 */

import {isUndefined} from 'util';
import {environment} from '../../environments/environment';

export enum SkinType {
  galaxy, /* default */
  desert,
  forest
}

export class SkinManager {

  public static instance = new SkinManager();

  private cssLink = document.createElement('link') as HTMLLinkElement;
  private currentSkin = SkinType.galaxy;

  private constructor() {
    this.cssLink.type = 'text/css';
    this.cssLink.rel = 'stylesheet';
    const head = document.getElementsByTagName('head')[0];
    head.appendChild(this.cssLink);
  }

  /**
   * 获取当前显示的皮肤
   * @returns {SkinType}
   */
  public get current(): SkinType {
    return this.currentSkin;
  }

  /**
   * 加载皮肤
   * @param skinType 皮肤样式
   */
  public loadSkin(skinType?: SkinType) {
    if (!isUndefined(skinType)) {
      this.currentSkin = skinType;
    }
    this.cssLink.href = this.generateUrl(this.currentSkin);
  }

  /**
   * 生成href连接地址
   * @param skinType 样式
   * @returns {any} 字符串
   */
  private generateUrl(skinType: SkinType): string {
    switch (skinType) {
      case SkinType.desert:
        return environment.development ? 'assets/skins/skin-desert.css' : 'assets/skins/skin-desert.css';
      case SkinType.forest:
        return environment.development ? 'assets/skins/skin-forest.css' : 'assets/skins/skin-forest.css';
      case SkinType.galaxy:
      default:
        return environment.development ? 'assets/skins/skin-galaxy.css' : 'assets/skins/skin-galaxy.css';
    }
  }
}
