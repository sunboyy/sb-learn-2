import { Component, OnInit } from '@angular/core';
import { Card, Course, Lesson, RecallcardService } from '../recallcard.service';

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

  createCard = {
    word: '',
    meaning: '',
    wordError: false,
    meaningError: false
  };

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

  onCreateCourse(name: string) {
    this.recallcardService.createCourse(name).subscribe((res) => {
      if (res.success) {
        res.data.lessons = [];
        this.courses.push(res.data);
        this.onClickCourse(res.data);
      } else {
        this.message = res.cause;
      }
    });
  }

  onCreateLesson(course: Course, name: string) {
    this.recallcardService.createLesson(course.id, name).subscribe((res) => {
      if (res.success) {
        this.selectedCourse.lessons.push(res.data);
        this.onClickLesson(res.data);
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
        this.selectedLesson = res.data;
      } else {
        this.message = res.cause;
      }
    });
  }

  onTypeCreateCard() {
    if (this.createCard.word) {
      this.createCard.wordError = false;
    }
    if (this.createCard.meaning) {
      this.createCard.meaningError = false;
    }
  }

  onCreateCard() {
    if (!this.createCard.word) {
      this.createCard.wordError = true;
    }
    if (!this.createCard.meaning) {
      this.createCard.meaningError = true;
    }
    if (this.createCard.wordError || this.createCard.meaningError) {
      return;
    }
    this.recallcardService
      .createCard(this.selectedLesson.id, this.createCard.word, this.createCard.meaning)
      .subscribe((res) => {
        if (res.success) {
          this.selectedLesson.cards.push(res.data);
          this.createCard.word = '';
          this.createCard.meaning = '';
        } else {
          this.message = res.cause;
        }
      });
  }

  onDeleteCard(card: Card) {
    this.recallcardService.deleteCard(card.id).subscribe((res) => {
      if (res.success) {
        this.selectedLesson.cards = this.selectedLesson.cards.filter((c) => c !== card);
      } else {
        this.message = res.cause;
      }
      console.log(res);
    });
  }
}
