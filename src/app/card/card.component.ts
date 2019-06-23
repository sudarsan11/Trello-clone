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

  // When user adds a new form field for comment
  onAddNewComment() {
    // Push a dummy value to dummy array for displaying new field
    this.comments.push(1);
  }

  // When user saves the card
  onSaveCard(form: NgForm) {

    const formValues = form.value;
    const cardComments = [];

    // Get values with the key name 'comment' from the form
    for (const key in formValues) {
      if (key.includes('comment')) {
        cardComments.push(formValues[key]);
      }
    }

    // Create a new card
    const newCard = {
       title : form.value.title,
       description: form.value.description,
       comments : cardComments
    }

    // Set the card value
    this.cardService.setCard(newCard);

  }

  ngOnInit() {

    // Check if the card is being edited
    this.isEdit = this.cardService.getIsEdit();

    // If being edited prepopulate values
    if (this.isEdit) {
      const editedCard = this.cardService.getCard();
      this.cardTitle = editedCard.title;
      this.cardDesc  = editedCard.description;

      const htmlFormCards = document.getElementsByClassName('card-comments');
      this.cardComments = editedCard.comments;
    }
  }

}
