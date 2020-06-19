import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { SessionService } from '../shared/session.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private sessionService: SessionService, private userService: UserService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (!this.sessionService.isSignedIn.getValue()) {
      return of(false);
    }
    return this.userService.getCurrentUser().pipe(
      filter((user) => user !== undefined),
      map((user) => user.authority === 'ROLE_ADMIN')
    );
  }
}
