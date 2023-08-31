import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Card, Lesson, RecallcardService } from '../recallcard.service';

@Component({
  selector: 'app-recallcard-lesson',
  templateUrl: './recallcard-lesson.component.html',
  styleUrls: ['./recallcard-lesson.component.scss']
})
export class RecallcardLessonComponent implements OnInit {
  lessonId: number;
  currentPlayMode: string;

  lesson: Lesson;
  message = '';
  playMode: string;
  multicardCards: Card[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recallcardService: RecallcardService
  ) {}

  ngOnInit(): void {
    this.lessonId = parseInt(this.route.snapshot.paramMap.get('lessonId'), 10);
    this.route.paramMap.subscribe((paramMap) => {
      this.currentPlayMode = paramMap.get('playMode');
      this.playMode = this.currentPlayMode;
    });
    this.recallcardService.getLesson(this.lessonId).subscribe((res) => {
      if (res.success) {
        this.lesson = res.data!;
        this.multicardCards = this.lesson.cards.map((card) => ({ ...card, open: false }));
      } else {
        this.message = res.cause!;
      }
    });
  }

  onChangePlayMode(): void {
    this.router.navigate(['..', this.playMode], {
      relativeTo: this.route
    });
  }
}
