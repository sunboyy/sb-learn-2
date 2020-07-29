import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {
  language: string;

  message = '';
  isLoading = false;
  isSaving = false;

  constructor(private userService: UserService, private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user) => {
      this.language = user.language;
    });
  }

  onSave(): void {
    this.isSaving = true;
    this.settingsService.updatePreferences(this.language).subscribe((res) => {
      this.isSaving = false;
      if (res.success) {
        this.userService.updateCurrentUser();
      } else {
      }
    });
  }
}
