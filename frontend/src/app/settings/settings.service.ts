import { Injectable } from '@angular/core';
import { ApiService, Result } from '../shared/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor(private api: ApiService) {}

  changePassword(currentPassword: string, newPassword: string): Observable<Result> {
    return this.api.post<Result>('user/change-password', { currentPassword, newPassword }, true);
  }
}
