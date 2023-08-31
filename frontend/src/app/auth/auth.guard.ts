import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { SessionService } from '../shared/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private sessionService: SessionService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.sessionService.isSignedIn.getValue()) {
      this.router.navigate(['auth', 'sign-in']);
      return false;
    }
    return true;
  }
}
