import { Injectable } from '@angular/core';
import { ApiService, Result } from '../shared/api.service';
import { Observable } from 'rxjs';
import { User } from '../user/user';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor(private api: ApiService) {}

  changePassword(currentPassword: string, newPassword: string): Observable<Result> {
    return this.api.post<Result>('user/change-password', { currentPassword, newPassword }, true);
  }

  updatePreferences(language: string): Observable<Result<User>> {
    return this.api.post<Result<User>>('user/preferences', { language }, true);
  }
}
