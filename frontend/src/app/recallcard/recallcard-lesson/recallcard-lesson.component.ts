import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card, Lesson, RecallcardService } from '../recallcard.service';

interface CardWithOpen extends Card {
  open: boolean;
}

@Component({
  selector: 'app-recallcard-lesson',
  templateUrl: './recallcard-lesson.component.html',
  styleUrls: ['./recallcard-lesson.component.scss']
})
export class RecallcardLessonComponent implements OnInit {
  lessonId: number;
  currentPlayMode: string;

  lesson: Lesson;
  cards: CardWithOpen[];
  message = '';
  playMode: string;

  constructor(private route: ActivatedRoute, private recallcardService: RecallcardService) {}

  ngOnInit(): void {
    this.lessonId = parseInt(this.route.snapshot.paramMap.get('lessonId'), 10);
    this.currentPlayMode = this.route.snapshot.paramMap.get('playMode');
    this.playMode = this.currentPlayMode;
    this.recallcardService.getLesson(this.lessonId).subscribe((res) => {
      if (res.success) {
        this.lesson = res.data;
        this.cards = this.lesson.cards.map((card) => ({ ...card, open: false }));
        this.shuffleCards();
      } else {
        this.message = res.cause;
      }
    });
  }

  get numOpenedCards(): number {
    return this.cards.filter((card) => card.open).length;
  }

  get numClosedCards(): number {
    return this.cards.length - this.numOpenedCards;
  }

  onToggleOpenCard(card: CardWithOpen) {
    card.open = !card.open;
  }

  onOpenAll() {
    this.cards.forEach((card) => (card.open = true));
  }

  onCloseAll() {
    this.cards.forEach((card) => (card.open = false));
  }

  shuffleCards() {
    for (let i = this.cards.length; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * i);
      const temp = this.cards[i - 1];
      this.cards[i - 1] = this.cards[randomIndex];
      this.cards[randomIndex] = temp;
    }
  }
}
