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

    this.cardService.setCard(newCard);


  }

  ngOnInit() {
  }

}
