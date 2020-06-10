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
  cards?: Card[];
}

export interface Card {
  id: number;
  word: string;
  meaning: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecallcardService {
  constructor(private api: ApiService) {}

  getAllCourses(): Observable<Result<Course[]>> {
    return this.api.get<Result<Course[]>>('recallcard/course/all', undefined, true);
  }

  getLesson(lessonId: number): Observable<Result<Lesson>> {
    return this.api.get<Result<Lesson>>('recallcard/lesson/get', { lessonId }, true);
  }
}
