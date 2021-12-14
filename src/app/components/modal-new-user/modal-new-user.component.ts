import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-modal-new-user',
  templateUrl: './modal-new-user.component.html',
  styleUrls: ['./modal-new-user.component.scss']
})
export class ModalNewUserComponent implements OnInit {
  public opened = false;
  public dataSaved = false;
  public newUserForm: FormGroup;

  @Input() usersLength: number;

  @Output() isUpdate: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.newUserForm = new FormGroup({
      "firstName": new FormControl('', Validators.required),
      "lastName": new FormControl('', Validators.required),
      "nickName": new FormControl('', Validators.required),
      "userEmail": new FormControl('', Validators.required),
      "userPhone": new FormControl('', Validators.required),
      "street": new FormControl('', Validators.required),
      "building": new FormControl('', Validators.required),
      "city": new FormControl('', Validators.required),
      "zipcode": new FormControl('', Validators.required),
      "website": new FormControl('', Validators.required),
      "companyScope": new FormControl('', Validators.required),
      "companyName": new FormControl('', Validators.required)
    });
  }

  public close(): void {
    this.opened = false;
  }

  public open(): void {
    this.opened = true;
  }

  public submit(): void {
    const newUser: User = {
      id: this.usersLength + 1,
      firstName: this.newUserForm.value.firstName,
      lastName: this.newUserForm.value.lastName,
      username: this.newUserForm.value.nickName,
      email: this.newUserForm.value.userEmail,
      address: {
        street: this.newUserForm.value.street,
        building: this.newUserForm.value.building,
        city: this.newUserForm.value.city,
        zipcode: this.newUserForm.value.zipcode
      }, 
      phone: this.newUserForm.value.userPhone, 
      website: this.newUserForm.value.website, 
      company: {
        name: this.newUserForm.value.companyName,
        scope: this.newUserForm.value.companyScope
      }
    };

    this.usersService.postNewUser(newUser).subscribe(
      (data: any) => {
        this.dataSaved = true;
        this.isUpdate.emit(data);
      },
      (error: any)  => console.log(error)
    );
    this.newUserForm.reset();
    this.close();
  }
}
