import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private signedIn = false;

  get isSignedIn(): boolean {
    return this.signedIn;
  }

  signIn(username: string, password: string): void {
    this.signedIn = true;
  }

  signOut(): void {
    this.signedIn = false;
  }
}
