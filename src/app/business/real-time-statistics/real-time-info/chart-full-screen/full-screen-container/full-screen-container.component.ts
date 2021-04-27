import {Component, ComponentFactoryResolver, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {isNullOrUndefined} from 'util';
import {FullScreenDirective} from '../full-screen.directive';
import {FullScreenSelectComponent} from '../full-screen-select/full-screen-select.component';
import {FullScreen1Component} from '../full-screen1/full-screen1.component';
import {FullScreen3Component} from '../full-screen3/full-screen3.component';
import {FullScreen2Component} from '../full-screen2/full-screen2.component';
import {FullScreen4Component} from '../full-screen4/full-screen4.component';
import {FullScreen6Component} from '../../chart-full-screen2/full-screen6/full-screen6.component';
import {FullScreen5Component} from '../../chart-full-screen2/full-screen5/full-screen5.component';
import {FullScreen7Component} from "../../chart-full-screen2/full-screen7/full-screen7.component";

@Component({
  selector: 'app-full-screen-container',
  templateUrl: './full-screen-container.component.html',
  styleUrls: ['./full-screen-container.component.css']
})
export class FullScreenContainerComponent {

  @ViewChild(FullScreenDirective)
  public warnMessageDirective: FullScreenDirective;

  @Input()
  public set fullScreenNumber(num: number) {
    this.selectFullScreenNumber = num;
    this.loadComponent();
  }

  @Output()
  public fullScreenSelect: EventEmitter<number> = new EventEmitter();

  private selectFullScreenNumber = 0;
  private selectSubscription: Subscription;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  public loadComponent() {

    // 获取动态组件的宿主元素模板,并清空模板内容
    const viewContainerRef = this.warnMessageDirective.viewContainerRef;
    viewContainerRef.clear();

    const component = this.getComponent(this.selectFullScreenNumber);

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

    // viewContainerRef可以访问到这个你打算用作动态组件宿主的元素。调用 ViewContainerRef 的 createComponent()把这个组件添加到模板中
    // createComponent() 方法返回一个引用，指向这个刚刚加载的组件。 使用这个引用就可以与该组件进行交互，比如设置它的属性或调用它的方法。

    const componentRef = viewContainerRef.createComponent(componentFactory);

    if (this.selectFullScreenNumber === 0) {
      this.selectSubscription && this.selectSubscription.unsubscribe();
      this.selectSubscription = (<FullScreenSelectComponent>componentRef.instance).fullScreenSelect.subscribe((num) => {
        this.fullScreenSelect.emit(num);
      });
    }
  }

  /* 生成动态组件 */
  public getComponent(type: number = 0): any {
    // 要想确保编译器照常生成工厂类，就要把这些动态加载的组件添加到 NgModule 的 entryComponents 数组中
    if (isNullOrUndefined(type) || type === 0) {
      return FullScreenSelectComponent;
    } else if (type === 1) {
      return FullScreen1Component;
    } else if (type === 2) {
      return FullScreen2Component;
    } else if (type === 3) {
      return FullScreen3Component;
    } else if (type === 4) {
      return FullScreen4Component;
    } else if (type === 5) {
      return FullScreen5Component;
    } else if (type === 6) {
      return FullScreen6Component;
    } else if (type === 7) {
      return FullScreen7Component;
    }
    return FullScreenSelectComponent;
  }

}
