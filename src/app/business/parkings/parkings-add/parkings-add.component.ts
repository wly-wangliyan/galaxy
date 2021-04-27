import {Component} from '@angular/core';
import {BasicInfoComponent} from './basic-info/basic-info.component';
import {SelectGroupsComponent} from './select-groups/select-groups.component';

@Component({
  selector: 'app-parkings-add',
  templateUrl: './parkings-add.component.html',
  styleUrls: ['./parkings-add.component.css']
})
export class ParkingsAddComponent {

  public tagName = '添加停车场';

  public onActivate(component: any) {
    if (component instanceof BasicInfoComponent) {
      this.tagName = '添加停车场';
    } else if (component instanceof SelectGroupsComponent) {
      this.tagName = '选择分组';
    }
  }
}
