import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-modal-edit-user',
  templateUrl: './modal-edit-user.component.html',
  styleUrls: ['./modal-edit-user.component.scss']
})
export class ModalEditUserComponent implements OnInit {
  public opened = false;
  public dataSaved = false;
  public editUserForm: FormGroup;

  @Input() user: User;

  @Output() isEdited: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.editUserForm = new FormGroup({
      "firstName": new FormControl(`${this.user.firstName}`, Validators.required),
      "lastName": new FormControl(`${this.user.lastName}`, Validators.required),
      "nickName": new FormControl(`${this.user.username}`, Validators.required),
      "userEmail": new FormControl(`${this.user.email}`, Validators.required),
      "userPhone": new FormControl(`${this.user.phone}`, Validators.required),
      "street": new FormControl(`${this.user.address.street}`, Validators.required),
      "building": new FormControl(`${this.user.address.building}`, Validators.required),
      "city": new FormControl(`${this.user.address.city}`, Validators.required),
      "zipcode": new FormControl(`${this.user.address.zipcode}`, Validators.required),
      "website": new FormControl(`${this.user.website}`, Validators.required),
      "companyScope": new FormControl(`${this.user.company.name}`, Validators.required),
      "companyName": new FormControl(`${this.user.company.scope}`, Validators.required)
    });
  }

  public close(): void {
    this.opened = false;
  }

  public open(): void {
    this.opened = true;
  }

  public submit(): void {
    const editedUser: User = {
      id: this.user.id,
      firstName: this.editUserForm.value.firstName,
      lastName: this.editUserForm.value.lastName,
      username: this.editUserForm.value.nickName,
      email: this.editUserForm.value.userEmail,
      address: {
        street: this.editUserForm.value.street,
        building: this.editUserForm.value.building,
        city: this.editUserForm.value.city,
        zipcode: this.editUserForm.value.zipcode
      }, 
      phone: this.editUserForm.value.userPhone, 
      website: this.editUserForm.value.website, 
      company: {
        name: this.editUserForm.value.companyName,
        scope: this.editUserForm.value.companyScope
      }
    };

    this.usersService.editUser(this.user.id.toString(), editedUser).subscribe(
      (data: any) => {
        this.dataSaved = true;
        this.isEdited.emit(data);
      },
      (error: any)  => console.log(error)
    );
    this.editUserForm.reset();
    this.close();
  }
}
