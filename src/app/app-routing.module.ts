import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { NewComponent } from './new/new.component';
import { ListComponent } from './list/list.component';
import { PlayComponent } from './play/play.component';

const routes: Routes = [
  { path: 'new', component: NewComponent },
  { path: ':timerId/edit', component: EditComponent },
  { path: ':timerId/play', component: PlayComponent },
  { path: '', component: ListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
