import { Component, OnInit } from '@angular/core';
import { Course, Lesson, RecallcardService } from '../recallcard.service';

@Component({
  selector: 'app-recallcard-learn',
  templateUrl: './recallcard-learn.component.html',
  styleUrls: ['./recallcard-learn.component.scss']
})
export class RecallcardLearnComponent implements OnInit {
  courses: Course[] = [];
  message = '';

  selectedCourse?: Course;
  selectedLesson?: Lesson;

  isMeaningVisible = true;

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
    if (this.selectedCourse !== course) {
      this.selectedCourse = course;
      this.selectedLesson = undefined;
    }
  }

  onClickLesson(lesson: Lesson) {
    this.selectedLesson = lesson;
    this.recallcardService.getLesson(lesson.id).subscribe((res) => {
      if (res.success) {
        this.selectedLesson = res.data;
      } else {
        this.message = res.cause;
      }
    });
  }

  onToggleVisiblity() {
    this.isMeaningVisible = !this.isMeaningVisible;
  }
}
