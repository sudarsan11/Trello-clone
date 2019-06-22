import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ListService } from './list.service';
import { CardInterface } from '../card/card.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(public listService: ListService) { }

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
        title : '',
        description : '',
        comments: ['', '']
    });
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
