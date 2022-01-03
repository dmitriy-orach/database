import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users/users.service';
import { UserFormComponent } from '../forms/user-form/user-form.component';

@Component({
  selector: 'app-user-modal-window',
  templateUrl: './user-modal-window.component.html',
  styleUrls: ['./user-modal-window.component.scss']
})
export class UserModalWindowComponent {
  public opened = false;

  @ViewChild(UserFormComponent) public userForm: UserFormComponent;

  @Input() public usersLength: number;
  @Input() public btnText: string;
  @Input() public title: string;
  @Input() public user: User;
  @Input() public typeModalWindow: string;

  @Output() public updateUsers = new EventEmitter;
  @Output() public updateUser = new EventEmitter;

  constructor(private usersService: UsersService) { }

  public close(): void {
    this.opened = false;
  }

  public open(): void {
    this.opened = true;
  }

  public submit(): void {
    this.userForm.submit();
  }

  postUser(userData: User): void {
    switch(this.typeModalWindow) {
      case 'Add user': 
        this.usersService.postNewUser(userData).subscribe(
          () => {
            this.updateUsers.emit();
          },
          (error)  => console.log(error)
        );
        this.close();
        break;

      case 'Edit user':
        this.usersService.editUser(this.user.id.toString(), userData).subscribe(
          () => {
            this.updateUser.emit();
          },
          (error)  => console.log(error)
        );
        this.close();
        break;
    }
  }
}
