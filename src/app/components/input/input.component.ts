import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    }
  ]
})
export class InputComponent implements ControlValueAccessor  {
  private fieldIsRequiredText: string = 'Field is required!';
  private patternForNamesText: string = 'Only letters!';
  private maxLengthLettersText: string = 'The maximum number of characters allowed is 55!';
  private patternForEmailText: string = 'Incorrect email!';
  private patternForPhoneText: string = 'The phone should only contain numbers! The number must start with + and its total length must be 13 characters!';

  @Input() public formControlName: string;
  @Input() public labelText: string;
  @Input() public form: FormGroup;

  public validationMessages(controlName: string): string {
    if(this.form.get(controlName)?.errors?.['required']) {
      return this.fieldIsRequiredText;
    } else if(this.form.get(controlName)?.errors?.['pattern']) {
      return this.patternForNamesText;
    } else if(this.form.get(controlName)?.errors?.['maxlength']) {
      return this.maxLengthLettersText;
    } else {
      return '';
    }
  }

  public validationMessagesEmail(controlName: string): string {
    if(this.form.get(controlName)?.errors?.['required']) {
      return this.fieldIsRequiredText;
    } else if(this.form.get(controlName)?.errors?.['pattern'] || this.form.get(controlName)?.errors?.['email']) {
      return this.patternForEmailText;
    } else {
      return '';
    }
  }

  public validationMessagesPhone(controlName: string): string {
    if(this.form.get(controlName)?.errors?.['required']) {
      return this.fieldIsRequiredText;
    } else if(this.form.get(controlName)?.errors?.['pattern']) {
      return this.patternForPhoneText;
    } else {
      return '';
    }
  }

  public writeValue(value: string): void {
  }

  public registerOnChange(fn: any): void {
  }

  public registerOnTouched(fn: any): void {
  }

  public setDisabledState?(isDisabled: boolean): void {
  }
}
