import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ListService } from './list.service';
import { CardInterface } from '../card/card.interface';
import { CardService } from '../card/card.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(public listService: ListService, public cardService: CardService) { }

  lists = [
    {
      item: 'List #1',
      children: [
        {
          title : 'Frontend',
          description : 'Work on lists and card components',
          comments: ['Create card', 'Add to list']
        }
      ]
    },

    {
      item: 'List #2',
      children: [
        {
          title : 'Backend',
          description : 'Work on API',
          comments: ['Create card API', 'Add to list API']
        }
      ],
    }
  ];

  onClickAddCard(listIndex: number) {

    this.lists[listIndex].children.push({
        title :  '',
        description : '',
        comments:  []
    });

    this.cardService.getCardUpdatedListener()
      .subscribe( (updatedCard) => {

        this.lists[listIndex].children.splice(this.lists[listIndex].children.length - 1, 1);

        this.lists[listIndex].children.push({
          title : updatedCard.title ,
          description : updatedCard.description ,
          comments: updatedCard.comments
        });


      })
  }

  drop(event: CdkDragDrop<{}[]>){
    if(event.previousContainer === event.container){
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  ngOnInit() {

  }
}
