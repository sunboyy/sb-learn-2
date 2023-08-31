import { Component } from '@angular/core';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  message = '';

  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  constructor(private settingsService: SettingsService) {}

  onUpdatePassword(): void {
    if (this.newPassword.length < 6) {
      this.message = 'The new password must be at least 6 characters long';
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.message = 'Confirm password does not match';
      return;
    }
    this.message = '';
    this.settingsService.changePassword(this.currentPassword, this.newPassword).subscribe((res) => {
      if (res.success) {
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      } else {
        this.message = res.cause!;
      }
    });
  }
}
