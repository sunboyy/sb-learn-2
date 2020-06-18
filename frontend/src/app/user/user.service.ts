import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService, Result } from '../shared/api.service';
import { SessionService } from '../shared/session.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser = new BehaviorSubject<User>(undefined);

  constructor(private api: ApiService, private session: SessionService) {
    this.session.isSignedIn.subscribe((next) => {
      if (next) {
        this.getProfile().subscribe((result) => {
          if (result.success) {
            this.currentUser.next(result.data);
          } else {
            this.currentUser.next(undefined);
          }
        });
      } else {
        this.currentUser.next(undefined);
      }
    });
  }

  private getProfile(): Observable<Result<User>> {
    return this.api.get<Result<User>>('user/profile', undefined, true);
  }

  getCurrentUser(): Observable<User> {
    return this.currentUser.asObservable();
  }
}
