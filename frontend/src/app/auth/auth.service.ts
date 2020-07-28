import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService, Result } from '../shared/api.service';
import { SessionService, StorageLocation } from '../shared/session.service';
import { User } from '../user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private api: ApiService, private session: SessionService) {}

  signIn(username: string, password: string, rememberMe: boolean): Observable<string | undefined> {
    return this.api
      .post<Result>('auth/sign-in', { username, password })
      .pipe(
        map((response) => {
          if (response.success) {
            this.session.setAccessToken(
              response.data.accessToken,
              rememberMe ? StorageLocation.Local : StorageLocation.Session
            );
            return;
          } else {
            return response.cause;
          }
        })
      );
  }

  register(username: string, password: string): Observable<Result<User>> {
    return this.api.post<Result<User>>('user/register', { username, password });
  }

  signOut(): void {
    this.session.destroy();
  }

  get isSignedIn(): boolean {
    return this.session.isSignedIn.getValue();
  }
}
