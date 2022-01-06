import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { catchError, of, take } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { PostsService } from 'src/app/services/posts/posts.service';
import { PostFormComponent } from '../forms/post-form/post-form.component';

@Component({
  selector: 'app-post-modal-window',
  templateUrl: './post-modal-window.component.html',
  styleUrls: ['./post-modal-window.component.scss']
})
export class PostModalWindowComponent implements OnInit {
  public postsLength: number;

  @ViewChild(PostFormComponent) public postForm: PostFormComponent;
  
  @Input() public title: string;
  @Input() public userId: number;
  @Input() public post: Post;
  @Input() public typeModalWindow: string;

  @Output() public updatePosts = new EventEmitter;
  @Output() public closeModal = new EventEmitter;

  constructor(private postsService: PostsService) { }

  public ngOnInit(): void {
    this.postsService.getPosts().pipe(take(1)).subscribe((posts: Post[]) => this.postsLength = posts.length);
  }

  public close(): void {
    this.closeModal.emit();
  }

  public submit(): void {
    this.postForm.submit();
  }

  public savePost(dataPost: { title: string, body: string }): void {
    const post: Post = {
      id: this.post ? this.post.id : this.postsLength + 1,
      userId: this.userId,
      title: dataPost.title,
      body: dataPost.body
    };

    switch(this.typeModalWindow) {
      case 'Add post':
        this.postsService.postNewPost(post).pipe(
          take(1),
          catchError(err => of(`Error: ${err}`))
        ).subscribe(
          () => {
            this.updatePosts.emit();
            this.close();
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
            this.close();
          }
        );
        break;
    }
  }
}
