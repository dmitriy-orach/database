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

  public ngOnInit(): void {
    this.userForm = new FormGroup({
      "firstName": new FormControl(this.user?.firstName ?? '', [Validators.required, Validators.maxLength(55), Validators.pattern('[a-zA-Z ]*')]),
      "lastName": new FormControl(this.user?.lastName ?? '', [Validators.required, Validators.maxLength(55), Validators.pattern('[a-zA-Z ]*')]),
      "nickName": new FormControl(this.user?.username ?? '', Validators.required),
      "userEmail": new FormControl(this.user?.email ?? '', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      "userPhone": new FormControl(this.user?.phone ?? '', [Validators.required, Validators.pattern("[+\+0-9]{13}")]),
      "street": new FormControl(this.user?.address.street ?? '', Validators.required),
      "building": new FormControl(this.user?.address.building ?? '', Validators.required),
      "city": new FormControl(this.user?.address.city ?? '', Validators.required),
      "zipcode": new FormControl(this.user?.address.zipcode ?? '', Validators.required),
      "website": new FormControl(this.user?.website ?? '', Validators.required),
      "companyScope": new FormControl(this.user?.company.name ?? '', Validators.required),
      "companyName": new FormControl(this.user?.company.scope ?? '', Validators.required)
    });
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

  public get firstName(): AbstractControl {
    return this.userForm.get('firstName') as AbstractControl;
  }

  public get lastName(): AbstractControl {
    return this.userForm.get('lastName') as AbstractControl;
  }

  public get nickName(): AbstractControl {
    return this.userForm.get('nickName') as AbstractControl;
  }

  public get userPhone(): AbstractControl {
    return this.userForm.get('userPhone') as AbstractControl;
  }

  public get userEmail(): AbstractControl {
    return this.userForm.get('userEmail') as AbstractControl;
  } 

  public get city(): AbstractControl {
    return this.userForm.get('city') as AbstractControl;
  }

  public get street(): AbstractControl {
    return this.userForm.get('street') as AbstractControl;
  } 

  public get building(): AbstractControl {
    return this.userForm.get('building') as AbstractControl;
  } 

  public get zipcode(): AbstractControl {
    return this.userForm.get('zipcode') as AbstractControl;
  } 

  public get website(): AbstractControl {
    return this.userForm.get('website') as AbstractControl;
  }

  public get companyName(): AbstractControl {
    return this.userForm.get('companyName') as AbstractControl;
  }

  public get companyScope(): AbstractControl {
    return this.userForm.get('companyScope') as AbstractControl;
  } 
}
