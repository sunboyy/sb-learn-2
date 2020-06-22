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

  createCourse(name: string): Observable<Result<Course>> {
    return this.api.post<Result<Course>>('recallcard/course/new', { name: name.trim() }, true);
  }

  editCourse(courseId: number, name: string): Observable<Result<Course>> {
    return this.api.post<Result<Course>>(
      'recallcard/course/edit',
      { courseId, name: name.trim() },
      true
    );
  }

  getLesson(lessonId: number): Observable<Result<Lesson>> {
    return this.api.get<Result<Lesson>>('recallcard/lesson/get', { lessonId }, true);
  }

  createLesson(courseId: number, name: string): Observable<Result<Lesson>> {
    return this.api.post<Result<Lesson>>(
      'recallcard/lesson/new',
      { courseId, name: name.trim() },
      true
    );
  }

  editLesson(lessonId: number, name: string): Observable<Result<Lesson>> {
    return this.api.post<Result<Lesson>>(
      'recallcard/lesson/edit',
      { lessonId, name: name.trim() },
      true
    );
  }

  createCard(lessonId: number, word: string, meaning: string): Observable<Result<Card>> {
    return this.api.post<Result<Card>>(
      'recallcard/card/new',
      { lessonId, word: word.trim(), meaning: meaning.trim() },
      true
    );
  }

  editCard(cardId: number, word: string, meaning: string): Observable<Result<Card>> {
    return this.api.post<Result<Card>>(
      'recallcard/card/edit',
      { cardId, word: word.trim(), meaning: meaning.trim() },
      true
    );
  }

  deleteCard(cardId: number): Observable<Result<null>> {
    return this.api.delete<Result<null>>('recallcard/card/delete', { cardId }, true);
  }
}
