import {
  Component,
  HostBinding,
  Input,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'button[app-rounded-button]',
  templateUrl: './rounded-button.component.html',
  styleUrls: ['./rounded-button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RoundedButtonComponent {
  @Input()
  dark = false;

  @HostBinding('class')
  elementClass = 'sbl-button-wrapper';
}
