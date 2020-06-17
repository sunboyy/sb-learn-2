import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'button[app-transparent-button]',
  templateUrl: './transparent-button.component.html',
  styleUrls: ['./transparent-button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TransparentButtonComponent {
  @HostBinding('class')
  elementClass = 'sbl-transparent-button-wrapper';
}
