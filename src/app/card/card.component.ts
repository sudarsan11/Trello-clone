import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor() { }

  comments = [1];

  onAddNewComment() {
    this.comments.push(1);
  }

  onSaveCard(form: NgForm) {
    console.log(form.value);
  }

  ngOnInit() {
  }

}
