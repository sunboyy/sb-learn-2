import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  VerticalListComponent,
  VerticalListHandler
} from 'src/app/shared/vertical-list/vertical-list.component';
import { Course, Lesson, RecallcardService } from '../recallcard.service';

@Component({
  selector: 'app-recallcard-learn',
  templateUrl: './recallcard-learn.component.html',
  styleUrls: ['./recallcard-learn.component.scss']
})
export class RecallcardLearnComponent implements OnInit, VerticalListHandler {
  courses: Course[] = [];
  message = '';

  selectedCourse?: Course;
  selectedLesson?: Lesson;

  isMeaningVisible = true;

  playMode = '';

  constructor(private recallcardService: RecallcardService, private router: Router) {}

  ngOnInit() {
    this.recallcardService.getAllCourses().subscribe((res) => {
      if (res.success) {
        this.courses = res.data;
      } else {
        this.message = res.cause;
      }
    });
  }

  onClickCourse(course: Course) {
    if (this.selectedCourse !== course) {
      this.selectedCourse = course;
      this.selectedLesson = undefined;
    }
  }

  onClickLesson(lesson: Lesson) {
    if (!this.selectedLesson || this.selectedLesson.id !== lesson.id) {
      this.selectedLesson = lesson;
      this.recallcardService.getLesson(lesson.id).subscribe((res) => {
        if (res.success) {
          this.selectedLesson = res.data;
        } else {
          this.message = res.cause;
        }
      });
    }
  }

  onToggleVisiblity() {
    this.isMeaningVisible = !this.isMeaningVisible;
  }

  onClickPlay() {
    this.router.navigate(['recallcard', 'lesson', this.selectedLesson.id, this.playMode]);
  }

  /**
   * VerticalListHandler implementation
   */
  verticalListGetItems(verticalList: VerticalListComponent): any[] {
    switch (verticalList.name) {
      case 'courses':
        return this.courses;
      case 'lessons':
        return this.selectedCourse.lessons;
    }
  }

  verticalListGetLabelAtIndex(verticalList: VerticalListComponent, index: number): string {
    switch (verticalList.name) {
      case 'courses':
        return this.courses[index].name;
      case 'lessons':
        return this.selectedCourse.lessons[index].name;
    }
  }

  verticalListOnClickItemAtIndex(verticalList: VerticalListComponent, index: number): void {
    switch (verticalList.name) {
      case 'courses':
        this.onClickCourse(this.courses[index]);
        break;
      case 'lessons':
        this.onClickLesson(this.selectedCourse.lessons[index]);
        break;
    }
  }

  verticalListIsItemSelectedAtIndex(verticalList: VerticalListComponent, index: number): boolean {
    switch (verticalList.name) {
      case 'courses':
        return this.courses[index] === this.selectedCourse;
      case 'lessons':
        return (
          this.selectedLesson && this.selectedCourse.lessons[index].id === this.selectedLesson.id
        );
    }
  }
}
