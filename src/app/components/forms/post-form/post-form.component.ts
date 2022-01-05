import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/interfaces/post';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  public postForm: FormGroup;

  @Input() public title: string;
  @Input() public post: Post;

  @Output() public dataPost: EventEmitter<{title: string, body: string}> = new EventEmitter;

  constructor() { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      "title": new FormControl(this.post?.title ?? '', Validators.required),
      "body": new FormControl(this.post?.body ?? '', Validators.required)
    });
  }

  public submit(): void {
    if(this.postForm.valid) {
      const post = this.postForm.value;
      this.dataPost.emit(post);
      this.postForm.reset();
    }
  }

  public get postTitle(): AbstractControl {
    return this.postForm.get('title') as AbstractControl;
  }

  public get  postBody(): AbstractControl {
    return this.postForm.get('body') as AbstractControl;
  }
}
