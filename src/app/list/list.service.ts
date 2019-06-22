import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ListService {


  constructor() {}

  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  setWithinList(prev, next) {
    const temp = this.todo[prev];
    this.todo[prev] = this.todo[next];
    this.todo[next] = temp;
  }

  getTodo() {
    return this.todo;
  }

}
