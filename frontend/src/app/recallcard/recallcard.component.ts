import { Component, OnInit } from '@angular/core';
import { Course, Lesson, RecallcardService } from './recallcard.service';

@Component({
  selector: 'app-recallcard',
  templateUrl: './recallcard.component.html',
  styleUrls: ['./recallcard.component.scss']
})
export class RecallcardComponent implements OnInit {
  courses: Course[] = [];
  message = '';

  selectedCourse?: Course;
  selectedLesson?: Lesson;

  constructor(private recallcardService: RecallcardService) {}

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
    this.selectedCourse = course;
    this.selectedLesson = undefined;
  }

  onClickLesson(lesson: Lesson) {
    this.selectedLesson = lesson;
  }
}
