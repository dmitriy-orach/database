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
  public isShowModal: boolean = false;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUsers().pipe(take(1)).subscribe((users) => {
      this.users = users;
    })
  }

  public addNewUser(): void {
    this.isShowModal = true;
  }
}
