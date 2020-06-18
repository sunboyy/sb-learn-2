import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, Result } from '../shared/api.service';
import { User } from '../user/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private api: ApiService) {}

  getAllUsers(): Observable<Result<User[]>> {
    return this.api.get<Result<User[]>>('admin/user/all', undefined, true);
  }
}
