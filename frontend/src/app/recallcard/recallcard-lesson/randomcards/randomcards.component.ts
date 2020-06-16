import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../../recallcard.service';

@Component({
  selector: 'app-randomcards',
  templateUrl: './randomcards.component.html',
  styleUrls: ['./randomcards.component.scss']
})
export class RandomcardsComponent implements OnInit {
  @Input()
  cards: Card[];

  currentCard: Card;
  showMeaning = false;
  isSwapped = false;
  countScore = false;
  numCorrect = 0;
  numTotal = 0;
  answer = '';

  ngOnInit(): void {
    this.randomCard();
  }

  randomCard() {
    const selectableCards = this.cards.filter((card) => card !== this.currentCard);
    this.currentCard = selectableCards[Math.floor(Math.random() * selectableCards.length)];
    this.showMeaning = false;
  }

  onShowMeaning() {
    this.showMeaning = true;
  }

  onToggleSwap() {
    this.isSwapped = !this.isSwapped;
    this.randomCard();
  }

  onToggleCountScore() {
    this.countScore = !this.countScore;
    if (this.countScore) {
      this.randomCard();
    }
  }

  onSubmitAnswer() {
    if (!this.answer) {
      return;
    }
    if (!this.isSwapped) {
      if (this.answer === this.currentCard.meaning) {
        this.numCorrect++;
      }
    } else {
      if (this.answer === this.currentCard.word) {
        this.numCorrect++;
      }
    }
    this.numTotal++;
    this.answer = '';
    this.randomCard();
  }
}
