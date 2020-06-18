import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../user/user';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly ACCESS_TOKEN_KEY = 'accessToken';

  isSignedIn = new BehaviorSubject<boolean>(!!sessionStorage.getItem(this.ACCESS_TOKEN_KEY));

  getAccessToken(): string {
    return sessionStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  setAccessToken(accessToken: string) {
    sessionStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    this.isSignedIn.next(true);
  }

  destroy() {
    sessionStorage.removeItem(this.ACCESS_TOKEN_KEY);
    this.isSignedIn.next(false);
  }
}
