import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
  constructor(private http: HttpClient, private session: SessionService, private router: Router) {}

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
    return this.http
      .get<T>(resolve(environment.backendUrl, path), options)
      .pipe(catchError(this.handleError));
  }

  post<T>(path: string, data: any, useAuth = false): Observable<T> {
    const options: HttpOptions = {};
    if (useAuth) {
      options.headers = {
        Authorization: 'Bearer ' + this.session.getAccessToken()
      };
    }
    return this.http
      .post<T>(resolve(environment.backendUrl, path), data, options)
      .pipe(catchError(this.handleError));
  }

  put<T>(path: string, data: any, useAuth = false): Observable<T> {
    const options: HttpOptions = {};
    if (useAuth) {
      options.headers = {
        Authorization: 'Bearer ' + this.session.getAccessToken()
      };
    }
    return this.http
      .put<T>(resolve(environment.backendUrl, path), data, options)
      .pipe(catchError(this.handleError));
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
    return this.http
      .delete<T>(resolve(environment.backendUrl, path), options)
      .pipe(catchError(this.handleError));
  }

  handleError = (err: any) => {
    if (err.status === 403) {
      this.session.destroy();
      this.router.navigate(['auth', 'sign-in']);
    }
    return throwError(err);
  };
}
