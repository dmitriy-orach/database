import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { ModalWindowService } from 'src/app/services/modal-window/modal-window.service';
import { UsersService } from '../../services/users/users.service'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  public users$: Observable<User[]>;
  public isOpenUserModal: boolean = false;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private modalWindowService: ModalWindowService
  ) { }

  public ngOnInit(): void {
    this.users$ = this.usersService.getUsers();
  }

  public updateUsers(): void {
    this.closeUserModal();
    this.users$ = this.usersService.getUsers();
  }

  public dblClick(user: User): void {
    this.router.navigate(
      ['/user-info', user.id]
    )
  }

  public openUserModal(): void {
    this.isOpenUserModal = this.modalWindowService.open();
  }

  public closeUserModal(): void {
    this.isOpenUserModal = this.modalWindowService.close();
  }
}
