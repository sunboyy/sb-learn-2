import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  VerticalListComponent,
  VerticalListHandler
} from '../shared/vertical-list/vertical-list.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements VerticalListHandler {
  menus = [{ label: 'Change Password', path: 'change-password' }];

  constructor(private router: Router, private route: ActivatedRoute) {}

  /**
   * VerticalListHandler implementation
   */
  verticalListGetItems(verticalList: VerticalListComponent): any[] {
    return this.menus;
  }

  verticalListGetLabelAtIndex(verticalList: VerticalListComponent, index: number): string {
    return this.menus[index].label;
  }

  verticalListOnClickItemAtIndex(verticalList: VerticalListComponent, index: number): void {
    this.router.navigate(['settings', this.menus[index].path]);
  }

  verticalListIsItemSelectedAtIndex(verticalList: VerticalListComponent, index: number): boolean {
    if (!this.route.firstChild) {
      return false;
    }
    return this.route.firstChild.routeConfig.path === this.menus[index].path;
  }
}
