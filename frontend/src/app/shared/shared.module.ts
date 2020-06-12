import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from './api.service';
import { CreateButtonComponent } from './create-button/create-button.component';
import { CurvedTextFieldComponent } from './curved-text-field/curved-text-field.component';
import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { HeaderTextComponent } from './header-text/header-text.component';
import { ListButtonItemComponent } from './list-button-item/list-button-item.component';
import { ListCreateItemComponent } from './list-create-item/list-create-item.component';
import { ListEditableButtonItemComponent } from './list-editable-button-item/list-editable-button-item.component';
import { RoundedButtonComponent } from './rounded-button/rounded-button.component';
import { RoundedTextFieldComponent } from './rounded-text-field/rounded-text-field.component';
import { SessionService } from './session.service';
import { StripedHeaderComponent } from './striped-header/striped-header.component';

@NgModule({
  declarations: [
    RoundedButtonComponent,
    RoundedTextFieldComponent,
    StripedHeaderComponent,
    ErrorMessageComponent,
    ListButtonItemComponent,
    ListEditableButtonItemComponent,
    HeaderTextComponent,
    DeleteButtonComponent,
    CreateButtonComponent,
    CurvedTextFieldComponent,
    ListCreateItemComponent
  ],
  providers: [SessionService, ApiService],
  imports: [CommonModule, HttpClientModule, FormsModule],
  exports: [
    RoundedButtonComponent,
    RoundedTextFieldComponent,
    StripedHeaderComponent,
    ErrorMessageComponent,
    ListButtonItemComponent,
    ListEditableButtonItemComponent,
    HeaderTextComponent,
    DeleteButtonComponent,
    CreateButtonComponent,
    CurvedTextFieldComponent,
    ListCreateItemComponent
  ]
})
export class SharedModule {}
