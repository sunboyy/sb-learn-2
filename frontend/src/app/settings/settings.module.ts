import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SettingsComponent } from './settings.component';
import { SettingsService } from './settings.service';
import { SettingsRoutingModule } from './settings-routing.module';
import { PreferencesComponent } from './preferences/preferences.component';

@NgModule({
  declarations: [SettingsComponent, ChangePasswordComponent, PreferencesComponent],
  providers: [SettingsService],
  imports: [CommonModule, SharedModule, FormsModule, SettingsRoutingModule]
})
export class SettingsModule {}
