import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RoundedButtonComponent } from './rounded-button/rounded-button.component';
import { RoundedTextFieldComponent } from './rounded-text-field/rounded-text-field.component';
import { StripedHeaderComponent } from './striped-header/striped-header.component';

@NgModule({
  declarations: [
    RoundedButtonComponent,
    RoundedTextFieldComponent,
    StripedHeaderComponent
  ],
  imports: [CommonModule],
  exports: [
    RoundedButtonComponent,
    RoundedTextFieldComponent,
    StripedHeaderComponent
  ]
})
export class SharedModule {}
