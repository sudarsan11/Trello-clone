import { Injectable } from '@angular/core';
import { CardInterface } from './card.interface';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CardService {

  card: CardInterface = {title: '', description: '', comments: []};
  private cardUpdated = new Subject<CardInterface>();

  isEdit = false;


  setIsEdit(status: boolean) {
    this.isEdit = status;
  }

  getIsEdit() {
    return this.isEdit;
  }

  setCard(newCard: CardInterface) {
    this.card = new CardInterface();
    this.card = newCard;
    this.cardUpdated.next(this.card);
  }

  getCard() {
    return this.card;
  }

  getCardUpdatedListener() {
    return this.cardUpdated.asObservable();
  }

}
