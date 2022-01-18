import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/interfaces/post';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  public postForm: FormGroup;
  public fieldIsRequired: string = 'Field is required!';

  @Input() public post: Post;

  public ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(this.post?.title ?? '', Validators.required),
      body: new FormControl(this.post?.body ?? '', Validators.required)
    });
  }

  public validationMessages(controlName: string): string {
    if(this.postForm.get(controlName)?.errors?.['required']) {
      return this.fieldIsRequired;
    } else {
      return '';
    }
  }
}
