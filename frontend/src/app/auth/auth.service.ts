import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService, Result } from '../shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly ACCESS_TOKEN_KEY = 'accessToken';

  constructor(private api: ApiService) {}

  get isSignedIn(): boolean {
    return !!sessionStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  signIn(username: string, password: string): Observable<string | undefined> {
    return this.api
      .post<Result>('auth/sign-in', { username, password })
      .pipe(
        map((response) => {
          if (response.success) {
            sessionStorage.setItem(
              this.ACCESS_TOKEN_KEY,
              response.data.accessToken
            );
            return;
          } else {
            return response.cause;
          }
        })
      );
  }

  signOut() {
    sessionStorage.removeItem(this.ACCESS_TOKEN_KEY);
  }
}
