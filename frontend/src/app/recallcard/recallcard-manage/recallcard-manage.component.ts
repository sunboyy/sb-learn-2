import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Card, Course, Lesson, RecallcardService } from '../recallcard.service';

@Component({
  selector: 'app-recallcard-manage',
  templateUrl: './recallcard-manage.component.html',
  styleUrls: ['./recallcard-manage.component.scss'],
  animations: [
    trigger('cardsParent', [transition(':enter', [])]),
    trigger('cards', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.2s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateX(0)' }),
        animate('0.2s ease-in', style({ opacity: 0, transform: 'translateX(300px)', height: 0 }))
      ])
    ])
  ]
})
export class RecallcardManageComponent implements OnInit {
  @ViewChild('wordInput')
  wordInput: ElementRef;

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

  ngOnInit(): void {
    this.recallcardService.getAllCourses().subscribe((res) => {
      if (res.success) {
        this.courses = res.data;
      } else {
        this.message = res.cause;
      }
    });
  }

  onClickCourse(course: Course): void {
    if (this.selectedCourse !== course) {
      this.selectedCourse = course;
      this.selectedLesson = undefined;
    }
  }

  onClickLesson(lesson: Lesson): void {
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

  onCreateCourse(name: string): void {
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

  onCreateLesson(course: Course, name: string): void {
    this.recallcardService.createLesson(course.id, name).subscribe((res) => {
      if (res.success) {
        this.selectedCourse.lessons.push(res.data);
        this.onClickLesson(res.data);
      } else {
        this.message = res.cause;
      }
    });
  }

  onRenameCourse(course: Course, name: string): void {
    this.recallcardService.editCourse(course.id, name).subscribe((res) => {
      if (res.success) {
        this.courses[this.courses.indexOf(course)] = res.data;
      } else {
        this.message = res.cause;
      }
    });
  }

  onRenameLesson(lesson: Lesson, name: string): void {
    this.recallcardService.editLesson(lesson.id, name).subscribe((res) => {
      if (res.success) {
        this.selectedCourse.lessons[this.selectedCourse.lessons.indexOf(lesson)] = res.data;
        this.selectedLesson = res.data;
      } else {
        this.message = res.cause;
      }
    });
  }

  onTypeCreateCard(): void {
    if (this.createCard.word.trim()) {
      this.createCard.wordError = false;
    }
    if (this.createCard.meaning.trim()) {
      this.createCard.meaningError = false;
    }
  }

  onCreateCard(): void {
    if (!this.createCard.word.trim()) {
      this.createCard.wordError = true;
    }
    if (!this.createCard.meaning.trim()) {
      this.createCard.meaningError = true;
    }
    if (this.createCard.wordError || this.createCard.meaningError) {
      return;
    }
    this.recallcardService
      .createCard(
        this.selectedLesson.id,
        this.createCard.word.trim(),
        this.createCard.meaning.trim()
      )
      .subscribe((res) => {
        if (res.success) {
          this.selectedLesson.cards.push(res.data);
          this.createCard.word = '';
          this.createCard.meaning = '';
          this.wordInput.nativeElement.focus();
        } else {
          this.message = res.cause;
        }
      });
  }

  onDeleteCard(card: Card): void {
    if (confirm('Are you sure you want to delete card ' + card.word + '/' + card.meaning + '?')) {
      this.recallcardService.deleteCard(card.id).subscribe((res) => {
        if (res.success) {
          this.selectedLesson.cards = this.selectedLesson.cards.filter((c) => c !== card);
        } else {
          this.message = res.cause;
        }
      });
    }
  }

  onEditCardWord(card: Card, word: string): void {
    this.recallcardService.editCard(card.id, word, '').subscribe((res) => {
      if (res.success) {
        card.word = res.data.word;
      } else {
        this.message = res.cause;
      }
    });
  }

  onEditCardMeaning(card: Card, meaning: string): void {
    this.recallcardService.editCard(card.id, '', meaning).subscribe((res) => {
      if (res.success) {
        card.meaning = res.data.meaning;
      } else {
        this.message = res.cause;
      }
    });
  }
}
