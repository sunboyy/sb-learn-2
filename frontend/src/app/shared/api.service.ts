import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

interface HttpOptions {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  params?:
    | HttpParams
    | {
        [param: string]: string | string[];
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient, private session: SessionService) {}

  get<T>(path: string, params?: any, useAuth = false): Observable<T> {
    const options: HttpOptions = {};
    if (useAuth) {
      options.headers = {
        Authorization: 'Bearer ' + this.session.getAccessToken()
      };
    }
    if (params) {
      options.params = params;
    }
    return this.http.get<T>(resolve(environment.backendUrl, path), options);
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

  delete<T>(path: string, params?: any, useAuth = false): Observable<T> {
    const options: HttpOptions = {};
    if (useAuth) {
      options.headers = {
        Authorization: 'Bearer ' + this.session.getAccessToken()
      };
    }
    if (params) {
      options.params = params;
    }
    return this.http.delete<T>(resolve(environment.backendUrl, path), options);
  }
}
