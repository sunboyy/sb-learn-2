import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'input[app-regular-text-field]',
  templateUrl: './regular-text-field.component.html',
  styleUrls: ['./regular-text-field.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegularTextFieldComponent implements OnInit {
  @HostBinding('class')
  elementClass = 'sbl-regular-text-field';

  @Input()
  error: Observable<boolean>;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    if (this.error) {
      this.error.subscribe((error) => {
        if (error) {
          this.elementRef.nativeElement.addClass('error');
        } else {
          this.elementRef.nativeElement.removeClass('error');
        }
      });
    }
  }
}
