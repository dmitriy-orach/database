import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { catchError, of, take } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users/users.service';
import { UserFormComponent } from '../forms/user-form/user-form.component';

@Component({
  selector: 'app-user-modal-window',
  templateUrl: './user-modal-window.component.html',
  styleUrls: ['./user-modal-window.component.scss']
})
export class UserModalWindowComponent {
  @ViewChild(UserFormComponent) public userForm: UserFormComponent;

  @Input() public usersLength: number;
  @Input() public title: string;
  @Input() public user: User;
  @Input() public typeModalWindow: string;

  @Output() public updateUsers = new EventEmitter;
  @Output() public updateUser = new EventEmitter;
  @Output() public closeModal = new EventEmitter;

  constructor(private usersService: UsersService) { }

  public close(): void {
    this.closeModal.emit();
  }

  public submit(): void {
    this.userForm.submit();
  }

  public postUser(userData: User): void {
    switch(this.typeModalWindow) {
      case 'Add user': 
        this.usersService.postNewUser(userData).pipe(
          take(1),
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
          take(1),
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
