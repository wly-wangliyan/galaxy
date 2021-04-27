import {ContentHoverComponent} from './content-hover.component';
import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  ViewContainerRef
} from '@angular/core';
import {ItemEntity} from '../../../../../data-statistics/data-statistics.model';

@Directive({
  selector: '[appContentHover]'
})
export class ContentHoverDirective {
  public componentRef: ComponentRef<ContentHoverComponent>;
  @Input() public appContentHover: string;
  // @Input() public dataList: Array<ItemEntity> = [];
  @Input() public dataList: any;
  @Input() public zLeft = 0;

  constructor(private el: ElementRef, private renderer2: Renderer2,
              public viewContainerRef: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  @HostListener('mouseover') onmouseover() {
    this.renderer2.setStyle(this.el.nativeElement, 'cursor', 'pointer');
    this.createComponent();
  }

  @HostListener('mouseleave') onmouseleave() {
    this.componentRef && this.componentRef.destroy();
  }

  public createComponent() {
    this.viewContainerRef.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ContentHoverComponent);
    this.componentRef = this.viewContainerRef.createComponent(componentFactory);
    this.componentRef.instance.title = this.appContentHover;
    this.componentRef.instance.dataList = this.dataList;
    this.componentRef.instance.zLeft = this.zLeft;
  }
}
