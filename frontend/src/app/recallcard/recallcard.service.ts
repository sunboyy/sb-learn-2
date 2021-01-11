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
    return this.api.get<Result<Course[]>>('recallcard/courses', undefined, true);
  }

  createCourse(name: string): Observable<Result<Course>> {
    return this.api.post<Result<Course>>('recallcard/courses', { name: name.trim() }, true);
  }

  editCourse(courseId: number, name: string): Observable<Result<Course>> {
    return this.api.put<Result<Course>>(
      'recallcard/courses/' + courseId,
      { name: name.trim() },
      true
    );
  }

  getLessons(courseId: number): Observable<Result<Lesson[]>> {
    return this.api.get<Result<Lesson[]>>(
      'recallcard/course/' + courseId + '/lessons',
      undefined,
      true
    );
  }

  getLesson(lessonId: number): Observable<Result<Lesson>> {
    return this.api.get<Result<Lesson>>('recallcard/lessons/' + lessonId, undefined, true);
  }

  createLesson(courseId: number, name: string): Observable<Result<Lesson>> {
    return this.api.post<Result<Lesson>>(
      'recallcard/lessons',
      { courseId, name: name.trim() },
      true
    );
  }

  editLesson(lessonId: number, name: string): Observable<Result<Lesson>> {
    return this.api.put<Result<Lesson>>(
      'recallcard/lessons/' + lessonId,
      { name: name.trim() },
      true
    );
  }

  getCards(lessonId: number): Observable<Result<Card[]>> {
    return this.api.get<Result<Card[]>>(
      'recallcard/lessons/' + lessonId + '/cards',
      undefined,
      true
    );
  }

  createCard(lessonId: number, word: string, meaning: string): Observable<Result<Card>> {
    return this.api.post<Result<Card>>(
      'recallcard/cards',
      { lessonId, word: word.trim(), meaning: meaning.trim() },
      true
    );
  }

  editCard(cardId: number, word: string, meaning: string): Observable<Result<Card>> {
    return this.api.post<Result<Card>>(
      'recallcard/cards/' + cardId,
      { word: word.trim(), meaning: meaning.trim() },
      true
    );
  }

  deleteCard(cardId: number): Observable<Result<null>> {
    return this.api.delete<Result<null>>('recallcard/cards/' + cardId, undefined, true);
  }
}
