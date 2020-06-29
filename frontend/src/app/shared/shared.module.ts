import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from './api.service';
import { CreateButtonComponent } from './create-button/create-button.component';
import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { EditableTextComponent } from './editable-text/editable-text.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { HeaderTextComponent } from './header-text/header-text.component';
import { ListButtonItemComponent } from './list-button-item/list-button-item.component';
import { ListCreateItemComponent } from './list-create-item/list-create-item.component';
import { ListEditableButtonItemComponent } from './list-editable-button-item/list-editable-button-item.component';
import { RegularTextFieldComponent } from './regular-text-field/regular-text-field.component';
import { RoundedButtonComponent } from './rounded-button/rounded-button.component';
import { RoundedTextFieldComponent } from './rounded-text-field/rounded-text-field.component';
import { SessionService } from './session.service';
import { StatusService } from './status.service';
import { StripedHeaderComponent } from './striped-header/striped-header.component';
import { TransparentButtonComponent } from './transparent-button/transparent-button.component';
import { VerticalListComponent } from './vertical-list/vertical-list.component';

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
    ListCreateItemComponent,
    EditableTextComponent,
    TransparentButtonComponent,
    VerticalListComponent,
    RegularTextFieldComponent
  ],
  providers: [SessionService, ApiService, StatusService],
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule],
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
    ListCreateItemComponent,
    EditableTextComponent,
    TransparentButtonComponent,
    VerticalListComponent,
    RegularTextFieldComponent
  ]
})
export class SharedModule {}
