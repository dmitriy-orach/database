import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UsersService } from '../../services/users/users.service'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  public users: User[] = [];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUsers().pipe(take(1)).subscribe((users) => this.users = users);
  }

  public updateUsers(event: any): void {
    if(!!event) {
      this.usersService.getUsers().pipe(take(1)).subscribe((users) => this.users = users);
    }
  }
}
