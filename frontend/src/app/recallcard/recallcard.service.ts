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
  isOwner: boolean;
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

  getAllCourses(): Observable<Course[]> {
    return this.api.get<Course[]>('recallcard/courses', undefined, true);
  }

  createCourse(name: string): Observable<Course> {
    return this.api.post<Course>('recallcard/courses', { name: name.trim() }, true);
  }

  editCourse(courseId: number, name: string): Observable<Course> {
    return this.api.put<Course>('recallcard/courses/' + courseId, { name: name.trim() }, true);
  }

  getCourseMembers(courseId: number): Observable<Result<User[]>> {
    return this.api.get<Result<User[]>>(
      'recallcard/courses/' + courseId + '/members',
      undefined,
      true
    );
  }

  addCourseMember(courseId: number, username: string): Observable<Result<User>> {
    return this.api.post<Result<User>>(
      'recallcard/courses/' + courseId + '/add-member',
      { username: username.trim() },
      true
    );
  }

  removeCourseMember(courseId: number, username: string): Observable<Result<null>> {
    return this.api.post<Result<null>>(
      'recallcard/courses/' + courseId + '/remove-member',
      { username: username.trim() },
      true
    );
  }

  getLessons(courseId: number): Observable<Result<Lesson[]>> {
    return this.api.get<Result<Lesson[]>>(
      'recallcard/courses/' + courseId + '/lessons',
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

  moveCards(fromLessonId: number, toLessonId: number, cardIds: number[]): Observable<Result<null>> {
    return this.api.post<Result<null>>(
      'recallcard/lessons/' + fromLessonId + '/cards?_a=move',
      { toLessonId, cardIds },
      true
    );
  }

  deleteCards(lessonId: number, cardIds: number[]): Observable<Result<null>> {
    return this.api.post<Result<null>>(
      'recallcard/lessons/' + lessonId + '/cards?_a=delete',
      { cardIds },
      true
    );
  }
}
