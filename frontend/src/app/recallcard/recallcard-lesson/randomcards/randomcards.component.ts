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

  ngOnInit(): void {
    this.randomCard();
  }

  randomCard(): void {
    const selectableCards = this.cards.filter((card) => card !== this.currentCard);
    this.currentCard = selectableCards[Math.floor(Math.random() * selectableCards.length)];
    this.showMeaning = false;
  }

  onShowMeaning(): void {
    this.showMeaning = true;
  }

  onToggleSwap(): void {
    this.isSwapped = !this.isSwapped;
    this.randomCard();
  }
}
