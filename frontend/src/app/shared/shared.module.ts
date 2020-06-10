import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ApiService } from './api.service';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { RoundedButtonComponent } from './rounded-button/rounded-button.component';
import { RoundedTextFieldComponent } from './rounded-text-field/rounded-text-field.component';
import { StripedHeaderComponent } from './striped-header/striped-header.component';

@NgModule({
  declarations: [
    RoundedButtonComponent,
    RoundedTextFieldComponent,
    StripedHeaderComponent,
    ErrorMessageComponent
  ],
  providers: [ApiService],
  imports: [CommonModule, HttpClientModule],
  exports: [
    RoundedButtonComponent,
    RoundedTextFieldComponent,
    StripedHeaderComponent,
    ErrorMessageComponent
  ]
})
export class SharedModule {}
