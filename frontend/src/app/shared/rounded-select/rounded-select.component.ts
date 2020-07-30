import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { Observable, isObservable, of } from 'rxjs';

@Component({
  selector: 'app-rounded-select',
  templateUrl: './rounded-select.component.html',
  styleUrls: ['./rounded-select.component.scss']
})
export class RoundedSelectComponent {
  @Input()
  options: RoundedSelectOption[] = [];

  @Input()
  value: string;

  @Output()
  valueChange = new EventEmitter<string>();

  isActive = false;

  constructor(private elementRef: ElementRef) {}

  getSelectedLabel(): Observable<string> {
    const option = this.options.find((opt) => opt.value === this.value);
    if (option === undefined) {
      return of('Select:');
    } else {
      return this.getLabel(option);
    }
  }

  getLabel(option: RoundedSelectOption): Observable<string> {
    if (isObservable(option.label)) {
      return option.label;
    } else {
      return of(option.label);
    }
  }

  isOptionSelected(option: RoundedSelectOption): boolean {
    return option.value === this.value;
  }

  onToggleActive(): void {
    this.isActive = !this.isActive;
  }

  onSelect(option: RoundedSelectOption): void {
    this.valueChange.emit(option.value);
    this.isActive = false;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isActive = false;
    }
  }
}

export interface RoundedSelectOption {
  value: string;
  label: string | Observable<string>;
}
