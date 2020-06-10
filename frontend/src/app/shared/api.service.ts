import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { resolve } from 'url';
import { environment } from '../../environments/environment';

export interface Result<T = any> {
  success: boolean;
  data?: T;
  cause?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get<T>(path: string): Observable<T> {
    return this.http.get<T>(resolve(environment.backendUrl, path));
  }

  post<T>(path: string, data: any): Observable<T> {
    return this.http.post<T>(resolve(environment.backendUrl, path), data);
  }
}
