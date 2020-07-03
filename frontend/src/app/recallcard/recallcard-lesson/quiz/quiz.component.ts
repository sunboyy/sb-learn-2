import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../../recallcard.service';

interface CardWithAnswer extends Card {
  answer: string;
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  @Input()
  cards: Card[];

  isSwapped = false;
  cardsWithAnswer: CardWithAnswer[] = [];
  currentIndex: number;
  isShowingResult = false;
  answer = '';

  ngOnInit(): void {
    for (const card of this.cards) {
      this.cardsWithAnswer.push({ ...card, answer: '' });
    }
    this.onRestart();
  }

  onEnter() {
    if (!this.isShowingResult && this.answer) {
      this.isShowingResult = true;
      this.currentCard.answer = this.answer;
    } else if (this.isShowingResult) {
      this.isShowingResult = false;
      this.currentIndex++;
      this.answer = '';
    }
  }

  onToggleSwap() {
    this.isSwapped = !this.isSwapped;
    this.shuffleCards();
  }

  onRestart() {
    this.cardsWithAnswer.forEach((card) => (card.answer = ''));
    this.shuffleCards();
    this.currentIndex = 0;
  }

  getCorrectAnswer(card: CardWithAnswer): string {
    return this.isSwapped ? card.word : card.meaning;
  }

  get isCurrentCardCorrect(): boolean {
    return this.getCorrectAnswer(this.currentCard) === this.currentCard.answer.trim();
  }

  get currentCard(): CardWithAnswer {
    return this.cardsWithAnswer[this.currentIndex];
  }

  get numCorrect(): number {
    return this.cardsWithAnswer.filter((card) => this.getCorrectAnswer(card) === card.answer.trim())
      .length;
  }

  get totalAnswered(): number {
    return this.cardsWithAnswer.filter((card) => card.answer).length;
  }

  private shuffleCards() {
    for (let i = this.cardsWithAnswer.length; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * i);
      const temp = this.cardsWithAnswer[i - 1];
      this.cardsWithAnswer[i - 1] = this.cardsWithAnswer[randomIndex];
      this.cardsWithAnswer[randomIndex] = temp;
    }
  }
}
