import { Component, OnInit } from '@angular/core';
import { Course, Lesson, RecallcardService } from '../recallcard.service';

@Component({
  selector: 'app-recallcard-manage',
  templateUrl: './recallcard-manage.component.html',
  styleUrls: ['./recallcard-manage.component.scss']
})
export class RecallcardManageComponent implements OnInit {
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

  onRenameCourse(course: Course, name: string) {
    this.recallcardService.editCourse(course.id, name).subscribe((res) => {
      if (res.success) {
        this.courses[this.courses.indexOf(course)] = res.data;
      } else {
        this.message = res.cause;
      }
    });
  }

  onRenameLesson(lesson: Lesson, name: string) {
    this.recallcardService.editLesson(lesson.id, name).subscribe((res) => {
      if (res.success) {
        this.selectedCourse.lessons[this.selectedCourse.lessons.indexOf(lesson)] = res.data;
      } else {
        this.message = res.cause;
      }
    });
  }
}
