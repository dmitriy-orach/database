import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UsersListComponent } from './components/users-list/users-list.component';

const routes: Routes = [
  { path: '', component: UsersListComponent},
  { path: 'users', component: UsersListComponent},
  { path: 'user-info/:id', component: UserInfoComponent, canActivate: [AuthGuard] },
  { path: 'error', component: NotFoundComponent},
  { path: '**', redirectTo: '/error' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
