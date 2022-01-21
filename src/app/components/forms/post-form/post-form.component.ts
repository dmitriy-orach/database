import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/interfaces/post';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  public legend: string = "Fill in the fields";
  public postForm: FormGroup;

  @Input() public post: Post;

  public ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(this.post?.title ?? '', Validators.required),
      body: new FormControl(this.post?.body ?? '', Validators.required),
      postId: new FormControl(this.post ? this.post.id : null)
    });
  }
}
