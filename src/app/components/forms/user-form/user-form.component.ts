import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  public userForm: FormGroup;

  @Input() public usersLength: number;
  @Input() public user?: User;

  @Output() public dataUser: EventEmitter<User> = new EventEmitter;
  
  constructor() { }

  ngOnInit(): void {
    if(this.user) {
      this.userForm = new FormGroup({
        "firstName": new FormControl(this.user.firstName, Validators.required),
        "lastName": new FormControl(this.user.lastName, Validators.required),
        "nickName": new FormControl(this.user.username, Validators.required),
        "userEmail": new FormControl(this.user.email, Validators.required),
        "userPhone": new FormControl(this.user.phone, Validators.required),
        "street": new FormControl(this.user.address.street, Validators.required),
        "building": new FormControl(this.user.address.building, Validators.required),
        "city": new FormControl(this.user.address.city, Validators.required),
        "zipcode": new FormControl(this.user.address.zipcode, Validators.required),
        "website": new FormControl(this.user.website, Validators.required),
        "companyScope": new FormControl(this.user.company.name, Validators.required),
        "companyName": new FormControl(this.user.company.scope, Validators.required)
      });
    } else {
      this.userForm = new FormGroup({
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
  }

  public submit(): void {
    if(this.userForm.valid) {
      const user: User = {
        id: this.user ? this.user.id : this.usersLength + 1,
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        username: this.userForm.value.nickName,
        email: this.userForm.value.userEmail,
        address: {
          street: this.userForm.value.street,
          building: this.userForm.value.building,
          city: this.userForm.value.city,
          zipcode: this.userForm.value.zipcode
        }, 
        phone: this.userForm.value.userPhone, 
        website: this.userForm.value.website, 
        company: {
          name: this.userForm.value.companyName,
          scope: this.userForm.value.companyScope
        }
      };
      this.dataUser.emit(user);
      this.userForm.reset();
    }
  }
}
