import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vertical-list',
  templateUrl: './vertical-list.component.html',
  styleUrls: ['./vertical-list.component.scss']
})
export class VerticalListComponent {
  @Input()
  name: string;

  @Input()
  title: string;

  @Input()
  titleIcon: string;

  @Input()
  handler: VerticalListHandler;
}

export interface VerticalListHandler {
  verticalListGetItems(verticalList: VerticalListComponent): any[];
  verticalListGetLabelAtIndex(
    verticalList: VerticalListComponent,
    index: number
  ): Observable<string>;
  verticalListGetIconAtIndex?(verticalList: VerticalListComponent, index: number): string;
  verticalListOnClickItemAtIndex(verticalList: VerticalListComponent, index: number): void;
  verticalListIsItemSelectedAtIndex(verticalList: VerticalListComponent, index: number): boolean;
}
