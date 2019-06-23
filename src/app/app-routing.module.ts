import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CardComponent } from './card/card.component';
import { BoardComponent } from './board/board.component';

const routes: Routes = [

  {path: 'list', component: ListComponent},
  {path: 'card', component: CardComponent},
  {path: 'board', component: BoardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
