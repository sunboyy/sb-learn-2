import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Card, Course, Lesson, RecallcardService, User } from '../recallcard.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-recallcard-learn',
  templateUrl: './recallcard-learn.component.html',
  styleUrls: ['./recallcard-learn.component.scss'],
  animations: [
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
export class RecallcardLearnComponent implements OnInit {
  @ViewChild('wordInput')
  wordInput: ElementRef;

  courses: Course[] = [];
  lessons: Lesson[] = [];
  members: User[] = [];
  cards: Card[] = [];
  message = '';

  selectedCourse?: Course;
  selectedLesson?: Lesson;
  selectedMember?: User;

  isMeaningVisible = true;

  playMode = '';

  createCardForm = {
    word: '',
    meaning: '',
    wordError: false,
    meaningError: false
  };

  isLoadingCourses = false;
  isLoadingLessons = false;
  isLoadingMembers = false;
  isLoadingCards = false;
  isCreatingCourse = false;
  isCreatingLesson = false;
  isCreatingCard = false;
  isAddingMember = false;
  isRemovingMember = false;
  isRenamingCourseIds = new Set<number>();
  isRenamingLessonIds = new Set<number>();

  constructor(private recallcardService: RecallcardService, private router: Router) {}

  ngOnInit(): void {
    this.isLoadingCourses = true;
    this.recallcardService.getAllCourses().subscribe((res) => {
      this.courses = res;
      this.isLoadingCourses = false;
    });
  }

  onClickCourse(course: Course): void {
    if (this.selectedCourse !== course) {
      this.selectedCourse = course;
      this.selectedLesson = undefined;
      this.selectedMember = undefined;
      this.getLessons();
      this.getCourseMembers();
    }
  }

  getLessons(): void {
    this.lessons = [];
    this.isLoadingLessons = true;
    this.recallcardService.getLessons(this.selectedCourse.id).subscribe((res) => {
      if (res.success) {
        this.lessons = res.data;
      } else {
        this.message = res.cause;
      }
      this.isLoadingLessons = false;
    });
  }

  getCourseMembers(): void {
    if (!this.selectedCourse.isOwner) {
      return;
    }
    this.members = [];
    this.isLoadingMembers = true;
    this.recallcardService.getCourseMembers(this.selectedCourse.id).subscribe((res) => {
      if (res.success) {
        this.members = res.data;
      } else {
        this.message = res.cause;
      }
      this.isLoadingMembers = false;
    });
  }

  onClickLesson(lesson: Lesson): void {
    if (!this.selectedLesson || this.selectedLesson.id !== lesson.id) {
      this.selectedLesson = lesson;
      this.isLoadingCards = true;
      this.recallcardService.getCards(lesson.id).subscribe((res) => {
        if (res.success) {
          this.cards = res.data;
        } else {
          this.message = res.cause;
        }
        this.isLoadingCards = false;
      });
    }
  }

  onClickMember(member: User): void {
    if (this.selectedMember && this.selectedMember.id === member.id) {
      this.selectedMember = undefined;
    } else {
      this.selectedMember = member;
    }
  }

  onAddMember(username: string): void {
    this.isAddingMember = true;
    this.recallcardService.addCourseMember(this.selectedCourse.id, username).subscribe((res) => {
      if (res.success) {
        this.members.push(res.data);
      } else {
        this.message = res.cause;
      }
      this.isAddingMember = false;
    });
  }

  onClickRemoveMember(): void {
    if (this.isRemovingMember) {
      return;
    }
    if (confirm('Are you sure you want to remove member ' + this.selectedMember.username + '?')) {
      this.isRemovingMember = true;
      this.recallcardService
        .removeCourseMember(this.selectedCourse.id, this.selectedMember.username)
        .subscribe((res) => {
          if (res.success) {
            this.members = this.members.filter((member) => member.id !== this.selectedMember.id);
            this.selectedMember = undefined;
          } else {
            this.message = res.cause;
          }
          this.isRemovingMember = false;
        });
    }
  }

  onToggleVisiblity(): void {
    this.isMeaningVisible = !this.isMeaningVisible;
  }

  onClickPlay(): void {
    this.router.navigate(['recallcard', 'lesson', this.selectedLesson.id, this.playMode]);
  }

  onCreateCourse(name: string): void {
    this.isCreatingCourse = true;
    this.recallcardService.createCourse(name).subscribe((res) => {
      this.courses.push(res);
      this.onClickCourse(res);
      this.isCreatingCourse = false;
    });
  }

  onRenameCourse(course: Course, name: string): void {
    this.isRenamingCourseIds.add(course.id);
    this.recallcardService.editCourse(course.id, name).subscribe((res) => {
      this.courses[this.courses.indexOf(course)] = res;
      this.isRenamingCourseIds.delete(course.id);
    });
  }

  onRenameLesson(lesson: Lesson, name: string): void {
    this.isRenamingLessonIds.add(lesson.id);
    this.recallcardService.editLesson(lesson.id, name).subscribe((res) => {
      if (res.success) {
        this.lessons[this.lessons.indexOf(lesson)] = res.data;
        this.selectedLesson = res.data;
      } else {
        this.message = res.cause;
      }
      this.isRenamingLessonIds.delete(lesson.id);
    });
  }

  onCreateLesson(course: Course, name: string): void {
    this.isCreatingLesson = true;
    this.recallcardService.createLesson(course.id, name).subscribe((res) => {
      if (res.success) {
        this.lessons.push(res.data);
        this.onClickLesson(res.data);
      } else {
        this.message = res.cause;
      }
      this.isCreatingLesson = false;
    });
  }

  onCreateCard(): void {
    if (!this.createCardForm.word.trim()) {
      this.createCardForm.wordError = true;
    }
    if (!this.createCardForm.meaning.trim()) {
      this.createCardForm.meaningError = true;
    }
    if (this.createCardForm.wordError || this.createCardForm.meaningError) {
      return;
    }
    this.isCreatingCard = true;
    this.recallcardService
      .createCard(
        this.selectedLesson.id,
        this.createCardForm.word.trim(),
        this.createCardForm.meaning.trim()
      )
      .subscribe((res) => {
        if (res.success) {
          this.cards.push(res.data);
          this.createCardForm.word = '';
          this.createCardForm.meaning = '';
          this.wordInput.nativeElement.focus();
        } else {
          this.message = res.cause;
        }
        this.isCreatingCard = false;
      });
  }

  onTypeCreateCard(): void {
    if (this.createCardForm.word.trim()) {
      this.createCardForm.wordError = false;
    }
    if (this.createCardForm.meaning.trim()) {
      this.createCardForm.meaningError = false;
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

  onDeleteCard(card: Card): void {
    if (confirm('Are you sure you want to delete card ' + card.word + '/' + card.meaning + '?')) {
      this.recallcardService.deleteCard(card.id).subscribe((res) => {
        if (res.success) {
          this.cards = this.cards.filter((c) => c !== card);
        } else {
          this.message = res.cause;
        }
      });
    }
  }
}
