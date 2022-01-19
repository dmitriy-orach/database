import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  public userForm: FormGroup;

  @Input() public user: User;

  public ngOnInit(): void {
    this.userForm = new FormGroup({
      firstName: new FormControl(this.user?.firstName ?? '', [Validators.required, Validators.maxLength(55), Validators.pattern('[a-zA-Z ]*')]),
      lastName: new FormControl(this.user?.lastName ?? '', [Validators.required, Validators.maxLength(55), Validators.pattern('[a-zA-Z ]*')]),
      nickName: new FormControl(this.user?.username ?? '', Validators.required),
      userEmail: new FormControl(this.user?.email ?? '', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      userPhone: new FormControl(this.user?.phone ?? '', [Validators.required, Validators.pattern("[+\+0-9]{13}")]),
      street: new FormControl(this.user?.address.street ?? '', Validators.required),
      building: new FormControl(this.user?.address.building ?? '', Validators.required),
      city: new FormControl(this.user?.address.city ?? '', Validators.required),
      zipcode: new FormControl(this.user?.address.zipcode ?? '', Validators.required),
      website: new FormControl(this.user?.website ?? '', Validators.required),
      companyScope: new FormControl(this.user?.company.name ?? '', Validators.required),
      companyName: new FormControl(this.user?.company.scope ?? '', Validators.required)
    });
  }
}
