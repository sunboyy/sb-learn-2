import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-button-item',
  templateUrl: './list-button-item.component.html',
  styleUrls: ['./list-button-item.component.scss']
})
export class ListButtonItemComponent {
  @Input()
  text: string;

  @Input()
  selected: boolean;
}
