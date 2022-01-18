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
  public fieldIsRequiredText: string = 'Field is required!';
  public patternForNamesText: string = 'Only letters!';
  public maxLengthLettersText: string = 'The maximum number of characters allowed is 55!';
  public patternForEmailText: string = 'Incorrect email!';
  public patternForPhoneText: string = 'The phone should only contain numbers! The number must start with + and its total length must be 13 characters!';

  @Input() public user: User;

  public ngOnInit(): void {
    this.userForm = new FormGroup({
      firstName: new FormControl(this.user?.firstName ?? '', [Validators.required, Validators.maxLength(55), Validators.pattern('[a-zA-Z ]*')]),
      lastName: new FormControl(this.user?.lastName ?? '', [Validators.required, Validators.maxLength(55), Validators.pattern('[a-zA-Z ]*')]),
      nickName: new FormControl(this.user?.username ?? '', Validators.required),
      userEmail: new FormControl(this.user?.email ?? '', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      userPhone: new FormControl(this.user?.phone ?? '', [Validators.required, Validators.pattern("[+\+0-9]{13}")]),
      address: new FormGroup({
        street: new FormControl(this.user?.address.street ?? '', Validators.required),
        building: new FormControl(this.user?.address.building ?? '', Validators.required),
        city: new FormControl(this.user?.address.city ?? '', Validators.required),
        zipcode: new FormControl(this.user?.address.zipcode ?? '', Validators.required),
      }),
      website: new FormControl(this.user?.website ?? '', Validators.required),
      company: new FormGroup({
        companyScope: new FormControl(this.user?.company.name ?? '', Validators.required),
        companyName: new FormControl(this.user?.company.scope ?? '', Validators.required)
      })
    });
  }

  public validationMessages(controlName: string): string {
    if(this.userForm.get(controlName)?.errors?.['required']) {
      return this.fieldIsRequiredText;
    } else if(this.userForm.get(controlName)?.errors?.['pattern']) {
      return this.patternForNamesText;
    } else if(this.userForm.get(controlName)?.errors?.['maxlength']) {
      return this.maxLengthLettersText;
    } else {
      return '';
    }
  }

  public validationMessagesEmail(controlName: string): string {
    if(this.userForm.get(controlName)?.errors?.['required']) {
      return this.fieldIsRequiredText;
    } else if(this.userForm.get(controlName)?.errors?.['pattern'] || this.userForm.get(controlName)?.errors?.['email']) {
      return this.patternForEmailText;
    } else {
      return '';
    }
  }

  public validationMessagesPhone(controlName: string): string {
    if(this.userForm.get(controlName)?.errors?.['required']) {
      return this.fieldIsRequiredText;
    } else if(this.userForm.get(controlName)?.errors?.['pattern']) {
      return this.patternForPhoneText;
    } else {
      return '';
    }
  }
}
