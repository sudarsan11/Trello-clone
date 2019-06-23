import { Injectable } from '@angular/core';
import { CardInterface } from './card.interface';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CardService {

  card: CardInterface = {title: '', description: '', comments: []};
  private cardUpdated = new Subject<CardInterface>();

  isEdit = false;

  // Set edit status
  setIsEdit(status: boolean) {
    this.isEdit = status;
  }

  // Get edit status
  getIsEdit() {
    return this.isEdit;
  }

  // Set current card value
  setCard(newCard: CardInterface) {
    this.card = new CardInterface();
    this.card = newCard;

    // Update the subject/ observable
    this.cardUpdated.next(this.card);
  }

  // Get the current card
  getCard() {
    return this.card;
  }

  // Push the value to the observers
  getCardUpdatedListener() {
    return this.cardUpdated.asObservable();
  }

}
