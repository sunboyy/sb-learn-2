import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'input[app-rounded-text-field]',
  templateUrl: './rounded-text-field.component.html',
  styleUrls: ['./rounded-text-field.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RoundedTextFieldComponent {
  @HostBinding('class')
  elementClass = 'sbl-rounded-text-field';
}
