import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CardService } from './card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(public cardService: CardService) { }

  comments = [1];

  isEdit = false;
  cardTitle: string;
  cardDesc: string;
  cardComments: Array<string>;

  onAddNewComment() {
    this.comments.push(1);
  }

  onSaveCard(form: NgForm) {

    const formValues = form.value;
    const cardComments = [];

    for (const key in formValues) {
      if (key.includes('comment')) {
        cardComments.push(formValues[key]);
      }
    }


    const newCard = {
       title : form.value.title,
       description: form.value.description,
       comments : cardComments
    }

    console.log(newCard);
    this.cardService.setCard(newCard);

  }

  ngOnInit() {

    this.isEdit = this.cardService.getIsEdit();

    if (this.isEdit) {
      const editedCard = this.cardService.getCard();
      this.cardTitle = editedCard.title;
      this.cardDesc  = editedCard.description;

      console.log(this.cardTitle);
      console.log(this.cardDesc);
      console.log(document.getElementsByClassName('card-comments'));


      const htmlFormCards = document.getElementsByClassName('card-comments');

      for (let i=0; i<htmlFormCards.length; i++) {
        console.log(htmlFormCards[i]);
      }

      this.cardComments = editedCard.comments;
    }
  }

}
