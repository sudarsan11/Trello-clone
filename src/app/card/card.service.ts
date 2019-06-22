import { Injectable } from '@angular/core';
import { CardInterface } from './card.interface';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CardService {

  card: CardInterface = {title: '', description: '', comments: []};
  private cardUpdated = new Subject<CardInterface>();

  setCard(newCard: CardInterface) {
    this.card = newCard;
    this.cardUpdated.next(newCard);
  }

  getCard() {
    return this.card;
  }

  getCardUpdatedListener() {
    return this.cardUpdated.asObservable();
  }

}
