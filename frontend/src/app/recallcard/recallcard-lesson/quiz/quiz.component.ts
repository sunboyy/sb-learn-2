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

  ngOnInit(): void {
    for (const card of this.cards) {
      this.cardsWithAnswer.push({ ...card, answer: '' });
    }
    this.onRestart();
  }

  onSubmitAnswer() {
    this.currentIndex++;
  }

  onToggleSwap() {
    this.isSwapped = !this.isSwapped;
  }

  onRestart() {
    this.cardsWithAnswer.forEach((card) => (card.answer = ''));
    this.shuffleCards();
    this.currentIndex = 0;
  }

  get currentCard(): CardWithAnswer {
    return this.cardsWithAnswer[this.currentIndex];
  }

  get numCorrect(): number {
    let sum = 0;
    for (let i = 0; i < this.currentIndex; i++) {
      const card = this.cardsWithAnswer[i];
      if (
        (!this.isSwapped && card.answer === card.meaning) ||
        (this.isSwapped && card.answer === card.word)
      ) {
        sum++;
      }
    }
    return sum;
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
