import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly ACCESS_TOKEN_KEY = 'accessToken';

  get isSignedIn(): boolean {
    return !!sessionStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  getAccessToken(): string {
    return sessionStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  setAccessToken(accessToken: string) {
    sessionStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
  }

  destroy() {
    sessionStorage.removeItem(this.ACCESS_TOKEN_KEY);
  }
}
