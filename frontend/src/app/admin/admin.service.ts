import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService, Result } from '../shared/api.service';
import { StatusService } from '../shared/status.service';
import { User } from '../user/user';

export interface Config {
  name: string;
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private api: ApiService, private statusService: StatusService) {}

  getAllUsers(): Observable<Result<User[]>> {
    return this.api.get<Result<User[]>>('admin/user/all', undefined, true);
  }

  setAllowSelfRegistration(value: 0 | 1): Observable<Result<Config>> {
    return this.api
      .post<Result<Config>>(
        'admin/config/self-registration',
        { allowSelfRegistration: value },
        true
      )
      .pipe(
        tap((result) => {
          this.statusService.updateStatus();
        })
      );
  }
}
