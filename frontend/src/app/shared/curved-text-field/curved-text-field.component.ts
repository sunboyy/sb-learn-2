import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'input[app-curved-text-field]',
  templateUrl: './curved-text-field.component.html',
  styleUrls: ['./curved-text-field.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CurvedTextFieldComponent {
  @HostBinding('class')
  elementClass = 'sbl-curved-text-field';
}
