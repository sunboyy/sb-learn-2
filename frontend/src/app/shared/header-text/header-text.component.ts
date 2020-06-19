import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-text',
  templateUrl: './header-text.component.html',
  styleUrls: ['./header-text.component.scss']
})
export class HeaderTextComponent {
  @Input()
  icon: string;
}
