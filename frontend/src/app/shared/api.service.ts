import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { resolve } from 'url';
import { environment } from '../../environments/environment';
import { SessionService } from './session.service';

export interface Result<T = any> {
  success: boolean;
  data?: T;
  cause?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient, private session: SessionService) {}

  get<T>(path: string, data?: any, useAuth = false): Observable<T> {
    if (useAuth) {
      return this.http.get<T>(resolve(environment.backendUrl, path), {
        headers: {
          Authorization: 'Bearer ' + this.session.getAccessToken()
        }
      });
    } else {
      return this.http.get<T>(resolve(environment.backendUrl, path));
    }
  }

  post<T>(path: string, data: any, useAuth = false): Observable<T> {
    if (useAuth) {
      return this.http.post<T>(resolve(environment.backendUrl, path), data, {
        headers: {
          Authorization: 'Bearer ' + this.session.getAccessToken()
        }
      });
    } else {
      return this.http.post<T>(resolve(environment.backendUrl, path), data);
    }
  }
}
