import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { take } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { PostsService } from 'src/app/services/posts/posts.service';
import { PostFormComponent } from '../forms/post-form/post-form.component';

@Component({
  selector: 'app-post-modal-window',
  templateUrl: './post-modal-window.component.html',
  styleUrls: ['./post-modal-window.component.scss']
})
export class PostModalWindowComponent implements OnInit {
  public opened = false;
  public postsLength: number;

  @ViewChild(PostFormComponent) public postForm: PostFormComponent;
  
  @Input() public btnText: string;
  @Input() public title: string;
  @Input() public userId: number;
  @Input() public post: Post;
  @Input() public typeModalWindow: string;

  @Output() public updatePosts = new EventEmitter;

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.postsService.getPosts().pipe(take(1)).subscribe((posts: Post[]) => this.postsLength = posts.length);
  }

  public close(): void {
    this.opened = false;
  }

  public open(): void {
    this.opened = true;
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
        this.postsService.postNewPost(post).subscribe(
          () => {
            this.updatePosts.emit();
          },
          (error)  => console.log(error)
        );
        this.close();
        break;

      case 'Edit post':
        this.postsService.editPost(this.post.id.toString(), post).subscribe(
          () => {
            this.updatePosts.emit();
          },
          (error)  => console.log(error)
        );
        this.close();
        break;
    }
  }
}
