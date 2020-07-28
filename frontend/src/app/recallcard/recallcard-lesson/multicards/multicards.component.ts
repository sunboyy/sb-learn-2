import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../../recallcard.service';

interface CardWithOpen extends Card {
  open: boolean;
}

@Component({
  selector: 'app-multicards',
  templateUrl: './multicards.component.html',
  styleUrls: ['./multicards.component.scss']
})
export class MulticardsComponent implements OnInit {
  cards: CardWithOpen[];

  @Input()
  inputCards: Card[];

  ngOnInit(): void {
    this.cards = this.inputCards.map((card) => ({ open: false, ...card }));
    this.shuffleCards();
  }

  get numOpenedCards(): number {
    return this.cards.filter((card) => card.open).length;
  }

  get numClosedCards(): number {
    return this.cards.length - this.numOpenedCards;
  }

  onToggleOpenCard(card: CardWithOpen): void {
    card.open = !card.open;
  }

  onOpenAll(): void {
    this.cards.forEach((card) => (card.open = true));
  }

  onCloseAll(): void {
    this.cards.forEach((card) => (card.open = false));
  }

  shuffleCards(): void {
    for (let i = this.cards.length; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * i);
      const temp = this.cards[i - 1];
      this.cards[i - 1] = this.cards[randomIndex];
      this.cards[randomIndex] = temp;
    }
  }
}
