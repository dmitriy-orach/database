import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  public userForm: FormGroup;

  @Input() public usersLength: number;
  @Input() public user: User;

  @Output() public dataUser: EventEmitter<User> = new EventEmitter;
  
  constructor() { }

  ngOnInit(): void {
    if(this.user) {
      this.userForm = new FormGroup({
        "firstName": new FormControl(this.user.firstName, {validators: [Validators.required, Validators.maxLength(55), Validators.pattern('[a-zA-Z ]*')], updateOn: "blur"}),
        "lastName": new FormControl(this.user.lastName, {validators: [Validators.required, Validators.maxLength(55), Validators.pattern('[a-zA-Z ]*')], updateOn: "blur"}),
        "nickName": new FormControl(this.user.username, Validators.required),
        "userEmail": new FormControl(this.user.email, { validators: [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')], updateOn: "blur"}),
        "userPhone": new FormControl(this.user.phone, {validators: [Validators.required, Validators.pattern("[+\+0-9]{13}")], updateOn: "blur"}),
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
        "firstName": new FormControl('', {validators: [Validators.required, Validators.maxLength(55), Validators.pattern('[a-zA-Z ]*')], updateOn: "blur"}),
        "lastName": new FormControl('', {validators: [Validators.required, Validators.maxLength(55), Validators.pattern('[a-zA-Z ]*')], updateOn: "blur"}),
        "nickName": new FormControl('', Validators.required),
        "userEmail": new FormControl('', { validators: [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')], updateOn: "blur" }),
        "userPhone": new FormControl('+380', {validators: [Validators.required, Validators.pattern("[+\+0-9]{13}")], updateOn: "blur"}),
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

  get firstName(): AbstractControl {
    return this.userForm.get('firstName') as AbstractControl;
  }

  get lastName(): AbstractControl {
    return this.userForm.get('lastName') as AbstractControl;
  }

  get userPhone(): AbstractControl {
    return this.userForm.get('userPhone') as AbstractControl;
  }

  get userEmail(): AbstractControl {
    return this.userForm.get('userEmail') as AbstractControl;
  } 
}
