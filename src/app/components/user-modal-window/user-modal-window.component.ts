import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { catchError, of, takeUntil } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { ModalWindowService } from 'src/app/services/modal-window/modal-window.service';
import { UsersService } from 'src/app/services/users/users.service';
import { BaseComponent } from '../base/base.component';
import { UserFormComponent } from '../forms/user-form/user-form.component';

@Component({
  selector: 'app-user-modal-window',
  templateUrl: './user-modal-window.component.html',
  styleUrls: ['./user-modal-window.component.scss']
})
export class UserModalWindowComponent extends BaseComponent {
  @ViewChild(UserFormComponent) public userForm: UserFormComponent;

  @Input() public usersLength: number;
  @Input() public title: string;
  @Input() public user: User;
  @Input() public typeModalWindow: string;

  @Output() public updateUsers = new EventEmitter;
  @Output() public updateUser = new EventEmitter;

  constructor(
    private usersService: UsersService,
    private modalWindowService: ModalWindowService
  ) {
    super();
  }

  public close(): void {
    this.modalWindowService.close();
  }

  public submit(): void {
    this.userForm.submit();
  }

  public postUser(userData: User): void {
    switch(this.typeModalWindow) {
      case 'Add user': 
        this.usersService.postNewUser(userData).pipe(
          takeUntil(this.destroyed),
          catchError(err => of(`Error: ${err}`))
        ).subscribe(
          () => {
            this.updateUsers.emit();
            this.close();
          }
        );
        break;

      case 'Edit user':
        this.usersService.editUser(this.user.id.toString(), userData).pipe(
          takeUntil(this.destroyed),
          catchError(err => of(`Error: ${err}`))
        ).subscribe(
          () => {
            this.updateUser.emit();
            this.close();
          }
        );
        break;
    }
  }
}
