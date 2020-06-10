import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, Result } from '../shared/api.service';

export interface User {
  id: number;
  username: string;
  enabled: number;
  authority: string;
}

export interface Course {
  id: number;
  name: string;
  owner: User;
  lessons?: Lesson[];
}

export interface Lesson {
  id: number;
  name: string;
  course?: Course;
}

@Injectable({
  providedIn: 'root'
})
export class RecallcardService {
  constructor(private api: ApiService) {}

  getAllCourses(): Observable<Result<Course[]>> {
    return this.api.get<Result<Course[]>>(
      'recallcard/course/all',
      undefined,
      true
    );
  }
}
