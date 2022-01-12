import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CellClickEvent } from '@progress/kendo-angular-grid';
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
  public isOpenUserModal: boolean;
  public user: User;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private modalWindowService: ModalWindowService
  ) { }

  public ngOnInit(): void {
    this.users$ = this.usersService.getUsers();
    this.getModalWindowStatus();
  }

  public updateUsers(): void {
    this.users$ = this.usersService.getUsers();
  }

  public dblClick(): void {
    this.router.navigate(
      ['/user-info', this.user.id]
    )
  }

  public openUserModal(): void {
    this.modalWindowService.open();
  }

  public cellClickHandler(cellData: CellClickEvent) {
    this.user = cellData.dataItem;
  }

  private getModalWindowStatus(): void {
    this.modalWindowService.getModalWindowStatus().subscribe(isModalOpened => {
      this.isOpenUserModal = isModalOpened;
    })
  }
}
