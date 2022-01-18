import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, of, take } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { ModalWindowService } from 'src/app/services/modal-window/modal-window.service';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  public postForm: FormGroup;
  public fieldIsRequired: string = 'Field is required!';

  @Input() public post: Post;
  @Input() public postsLength: number;
  @Input() public typeModalWindow: string;
  @Input() public userId: number;

  @Output() public updatePosts = new EventEmitter;

  constructor(
    private postsService: PostsService,
    private modalWindowService: ModalWindowService
  ) { }

  public ngOnInit(): void {
    this.postForm = new FormGroup({
      "title": new FormControl(this.post?.title ?? '', Validators.required),
      "body": new FormControl(this.post?.body ?? '', Validators.required)
    });
  }

  public submit(): void {
    if(this.postForm.valid) {
      const post: Post = {
        id: this.post ? this.post.id : this.postsLength + 1,
        userId: this.post ? this.post.userId : this.userId,
        title: this.postForm.value.title,
        body: this.postForm.value.body
      };
  
      switch(this.typeModalWindow) {
        case 'Add post':
          this.postsService.postNewPost(post).pipe(
            take(1),
            catchError(err => of(`Error: ${err}`))
          ).subscribe(
            () => {
              this.updatePosts.emit();
              this.modalWindowService.close();
            }
          );
          break;
  
        case 'Edit post':
          this.postsService.editPost(this.post.id.toString(), post).pipe(
            take(1), 
            catchError(err => of(`Error: ${err}`))
          ).subscribe(
            () => {
              this.updatePosts.emit();
              this.modalWindowService.close();
            }
          );
          break;
      }
      this.postForm.reset();
    }
  }

  public validationMessages(controlName: string): string {
    if(this.postForm.get(controlName)?.errors?.['required']) {
      return this.fieldIsRequired;
    } else {
      return '';
    }
  }
}
