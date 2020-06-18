import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService, Result } from '../shared/api.service';
import { SessionService } from '../shared/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private api: ApiService, private session: SessionService) {}

  signIn(username: string, password: string): Observable<string | undefined> {
    return this.api
      .post<Result>('auth/sign-in', { username, password })
      .pipe(
        map((response) => {
          if (response.success) {
            this.session.setAccessToken(response.data.accessToken);
            return;
          } else {
            return response.cause;
          }
        })
      );
  }

  signOut() {
    this.session.destroy();
  }

  get isSignedIn() {
    return this.session.isSignedIn.getValue();
  }
}
