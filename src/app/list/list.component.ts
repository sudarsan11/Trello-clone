import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ListService } from './list.service';
import { CardService } from '../card/card.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(public cardService: CardService) { }
  showForm = false;
  showListForm = false;
  disableAddCard = false;

  lists = [
    {
      item: 'List #1',
      children:[
        { item: 'Admiral Flankson', description: 'A big sentence for description' , comments: ['comm 1', 'comm 2']},
      ]
    },
    {
      item: 'List #2',
      children: [
        { item: 'Admiral Parkour', description: 'A big sentence for description', comments: ['comm 1', 'comm 2'] },
      ]
    },
    {
      item: 'List #3',
      children: [
        { item: 'Admiral Tombs',  description: 'A big sentence for description' , comments: ['comm 1', 'comm 2']},
      ]
    },
    {
      item: 'List #4',
      children: [
        { item: 'Admiral Tombs',  description: 'A big sentence for description', comments: ['comm 1', 'comm 2'] },
      ]

    }
  ]

  onDeleteCard(listIndex: number, cardIndex: number) {
    this.lists[listIndex].children.splice(cardIndex, 1);
  }


  onUpdateCard(listIndex: number, cardIndex: number) {


    this.cardService.setCard({title: this.lists[listIndex].children[cardIndex].item,
       description: this.lists[listIndex].children[cardIndex].description, comments: []});

    this.lists[listIndex].children[cardIndex].item = '';
    this.lists[listIndex].children[cardIndex].description = '';
    this.lists[listIndex].children[cardIndex].comments = [];

    this.showForm = true;
    this.disableAddCard = true;
    this.cardService.setIsEdit(true);

    const cardSub = this.cardService.getCardUpdatedListener()
    .subscribe( (updatedCard) => {

      this.lists[listIndex].children[cardIndex] = ({item: updatedCard.title, description: updatedCard.description,
         comments: updatedCard.comments});
      cardSub.unsubscribe();
      this.disableAddCard = false;
      this.showForm = false;
      this.cardService.setIsEdit(false);
    })
  }


  onAddCard(listIndex: number) {

    this.disableAddCard = true;
    this.lists[listIndex].children.push({item: '', description: '', comments: []});
    this.showForm = true;

    const cardSub = this.cardService.getCardUpdatedListener()
      .subscribe( (updatedCard) => {

        this.lists[listIndex].children[this.lists[listIndex].children.length - 1 ] = ({item: updatedCard.title,
           description: updatedCard.description, comments: updatedCard.comments });
        cardSub.unsubscribe();
        this.disableAddCard = false;
      })


  }

  onCreateList(form: NgForm) {

    this.lists.push({
      item: form.value.title,
      children: [{item: '', description : '', comments: []}]
    });

    const listSize = this.lists.length - 1;
    const childSize = this.lists[listSize].children.length - 1;

    this.lists[listSize].children.splice(childSize, 1);
    this.showListForm = false;
  }

  onAddNewList() {

    this.showListForm = true;
  }

  drop(event: CdkDragDrop<{}[]>){
    if (event.previousContainer === event.container){
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }

  }



  ngOnInit() {

  }
}
