import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UsersListComponent } from './components/users-list/users-list.component';

const routes: Routes = [
  { path: '', component: UsersListComponent},
  { path: 'users', component: UsersListComponent},
  { path: '**', component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
