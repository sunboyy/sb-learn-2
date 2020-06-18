import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SettingsComponent } from './settings.component';
import { SettingsService } from './settings.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SettingsComponent, ChangePasswordComponent],
  providers: [SettingsService],
  imports: [CommonModule, SharedModule, RouterModule, FormsModule]
})
export class SettingsModule {}
