import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { catchError, of, takeUntil } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UserMapper } from 'src/app/mappers/user.mapper';
import { ModalWindowService } from 'src/app/services/modal-window/modal-window.service';
import { UsersService } from 'src/app/services/users/users.service';
import { BaseComponent } from '../../base/base.component';
import { UserFormComponent } from '../../forms/user-form/user-form.component';

@Component({
  selector: 'app-user-modal-window',
  templateUrl: './user-modal-window.component.html',
  styleUrls: ['./user-modal-window.component.scss']
})
export class UserModalWindowComponent extends BaseComponent {
  public textCancel: string = 'Cancel';
  public textSubmit: string = 'Submit';
  public textApply: string = 'Apply';

  @ViewChild(UserFormComponent) public userFormComponent: UserFormComponent;

  @Input() public usersLength: number;
  @Input() public title: string;
  @Input() public user: User;
  @Input() public isUserSaved: boolean;

  @Output() public updateUsers = new EventEmitter;
  @Output() public updateUser = new EventEmitter;

  constructor(
    private usersService: UsersService,
    private modalWindowService: ModalWindowService,
    private userMapper: UserMapper
  ) {
    super();
  }

  public close(): void {
    this.modalWindowService.close();
  }

  public submit(): void {
    if(this.userFormComponent.userForm.valid) {
      const user: User = this.userMapper.mapUser(this.userFormComponent.userForm.value, this.user, this.usersLength, this.isUserSaved);
      if(this.user) {
        this.usersService.editUser(this.user.id.toString(), user).pipe(
          takeUntil(this.destroyed),
          catchError(err => of(`Error: ${err}`))
        ).subscribe(
          () => {
            this.closeModalMechanism();
          }
        );
      } else {
        this.usersService.postNewUser(user).pipe(
          takeUntil(this.destroyed),
          catchError(err => of(`Error: ${err}`))
        ).subscribe(
          () => {
            this.closeModalMechanism();
          }
        );
      }
    }
  }

  apply() {
    if(this.userFormComponent.userForm.valid) {
      const user: User = this.userMapper.mapUser(this.userFormComponent.userForm.value, this.user, this.usersLength, this.isUserSaved);
      if(this.user) {
        this.user = user;
        this.updateUser.emit(this.user);
        this.close();
      }
    }
  }

  private closeModalMechanism(): void {
    this.user ? this.updateUser.emit() : this.updateUsers.emit();
    this.userFormComponent.userForm.reset();
    this.close();
  }
}
