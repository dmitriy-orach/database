import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UsersService } from '../../services/users/users.service'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  public users$: Observable<User[]>;

  constructor(
    private usersService: UsersService,
    private router: Router  
  ) { }

  public ngOnInit(): void {
    this.users$ = this.usersService.getUsers();
  }

  public updateUsers(): void {
      this.users$ = this.usersService.getUsers();
  }

  public dblClick(user: User): void {
    this.router.navigate(
      ['/user-info', user.id]
    )
  } 
}
