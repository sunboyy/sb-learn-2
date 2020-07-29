import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { AuthGuard } from '../auth/auth.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PreferencesComponent } from './preferences/preferences.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'preferences', component: PreferencesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
