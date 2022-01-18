import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { catchError, of, takeUntil } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UserMapper } from 'src/app/mappers/user.mapper';
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
  @ViewChild(UserFormComponent) public userFormComponent: UserFormComponent;

  @Input() public usersLength: number;
  @Input() public title: string;
  @Input() public user: User;

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
      const user: User = this.userMapper.mapUser(this.userFormComponent.userForm.value, this.user, this.usersLength);
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

  private closeModalMechanism(): void {
    this.user? this.updateUser.emit() : this.updateUsers.emit();
    this.userFormComponent.userForm.reset();
    this.close();
  }
}
