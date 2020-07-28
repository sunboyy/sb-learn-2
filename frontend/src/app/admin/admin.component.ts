import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  VerticalListComponent,
  VerticalListHandler
} from '../shared/vertical-list/vertical-list.component';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements VerticalListHandler {
  menus = [{ label: this.translate.stream('admin.user.title'), icon: 'users', path: 'user' }];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {}

  /**
   * VerticalListHandler implementation
   */
  verticalListGetItems(verticalList: VerticalListComponent): any[] {
    return this.menus;
  }

  verticalListGetLabelAtIndex(
    verticalList: VerticalListComponent,
    index: number
  ): Observable<string> {
    return this.menus[index].label;
  }

  verticalListGetIconAtIndex?(verticalList: VerticalListComponent, index: number): string {
    return this.menus[index].icon;
  }

  verticalListOnClickItemAtIndex(verticalList: VerticalListComponent, index: number): void {
    this.router.navigate(['admin', this.menus[index].path]);
  }

  verticalListIsItemSelectedAtIndex(verticalList: VerticalListComponent, index: number): boolean {
    if (!this.route.firstChild) {
      return false;
    }
    return this.route.firstChild.routeConfig.path === this.menus[index].path;
  }
}
