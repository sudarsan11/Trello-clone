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

  constructor(public listService: ListService, public cardService: CardService) { }
  showForm = false;
  showListForm = false;
  disableAddCard = false;


  lists = [];

  /*
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

  */

  // When user deletes an existing card
  onDeleteCard(listIndex: number, cardIndex: number) {

    // Get _id of mongo docs
    const listID = this.lists[listIndex]._id;
    const cardID = this.lists[listIndex].children[cardIndex]._id;

    // Delete in local
    this.lists[listIndex].children.splice(cardIndex, 1);

    // Delete in DB
    this.listService.deleteCard(listID, cardID);
  }

  // When user updates an existing card
  onUpdateCard(listIndex: number, cardIndex: number) {

    // To prepopulate the values in form
    this.cardService.setCard({title: this.lists[listIndex].children[cardIndex].item,
       description: this.lists[listIndex].children[cardIndex].description, comments: []});

    // Reset current values
    this.lists[listIndex].children[cardIndex].item = '';
    this.lists[listIndex].children[cardIndex].description = '';
    this.lists[listIndex].children[cardIndex].comments = [];

    // Enable edit mode
    this.showForm = true;
    this.disableAddCard = true;
    this.cardService.setIsEdit(true);

    // Subscribe and get the updated card value
    const cardSub = this.cardService.getCardUpdatedListener()
    .subscribe( (updatedCard) => {

      // Get _id of mongo docs
      const listID = this.lists[listIndex]._id;
      const cardID = this.lists[listIndex].children[cardIndex]._id;

      // Update values in DB
      this.listService.updateCard(listID, cardID, updatedCard);

      // Update the local array
      this.lists[listIndex].children[cardIndex] = ({item: updatedCard.title, description: updatedCard.description,
      comments: updatedCard.comments});

      // Unsubscribe from event
      cardSub.unsubscribe();

      // Disable edit mode
      this.disableAddCard = false;
      this.showForm = false;
      this.cardService.setIsEdit(false);
    })
  }


  // When user adds a card to an existing list
  onAddCard(listIndex: number) {

    // Disable adding cards further before adding current card
    this.disableAddCard = true;
    // Push a dummy card into list to create a box
    this.lists[listIndex].children.push({item: '', description: '', comments: []});
    // Show the form to get card data
    this.showForm = true;

    // Get the new card value submitted using the form
    const cardSub = this.cardService.getCardUpdatedListener()
      .subscribe( (updatedCard) => {

        // Push it to local array
        this.lists[listIndex].children[this.lists[listIndex].children.length - 1 ] = ({item: updatedCard.title,
           description: updatedCard.description, comments: updatedCard.comments });

        // Push the new card to DB
        this.listService.createCard( this.lists[listIndex]._id, updatedCard);

        // Unsubscribe from the event
        cardSub.unsubscribe();

        // Allow adding new cards
        this.disableAddCard = false;
      })


  }

  // On creating a new list
  onCreateList(form: NgForm) {

    // Push a dummy card to list
    this.lists.push({
      item: form.value.title,
      children: [{item: '', description : '', comments: []}]
    });

    // Get the indices
    const listSize = this.lists.length - 1;
    const childSize = this.lists[listSize].children.length - 1;

    // Remove the dummy card and show add card button
    this.lists[listSize].children.splice(childSize, 1);
    this.showListForm = false;

    // Creating a list in DB
    this.listService.createList(this.lists[listSize])
      .subscribe(res => {
        window.location.reload();
      }, err => {
        alert('Something went wrong');
        console.log(err);
      });

  }

  // On adding a new list show a form to get list title
  onAddNewList() {
    this.showListForm = true;
  }

  // When the user drags the card
  drop(event: CdkDragDrop<{}[]>){

    // If within same list
    if (event.previousContainer === event.container){
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }

  }

  ngOnInit() {

    // Fetch the initial lists from DB
    this.listService.fetchLists()
      .subscribe(list => {
        this.lists = list.fetchedLists;
        console.log(this.lists);
      }, error => {
        alert('Something went wrong');
        console.log(error);
      });

  }
}
