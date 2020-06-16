import { Component, Input } from '@angular/core';
import { Card } from '../../recallcard.service';

interface CardWithOpen extends Card {
  open: boolean;
}

@Component({
  selector: 'app-multicards',
  templateUrl: './multicards.component.html',
  styleUrls: ['./multicards.component.scss']
})
export class MulticardsComponent {
  @Input()
  cards: CardWithOpen[];

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
