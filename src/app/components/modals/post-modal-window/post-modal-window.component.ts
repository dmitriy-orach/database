import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { catchError, of, take } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { PostMapper } from 'src/app/mappers/post.mapper';
import { ModalWindowService } from 'src/app/services/modal-window/modal-window.service';
import { PostsService } from 'src/app/services/posts/posts.service';
import { PostFormComponent } from '../../forms/post-form/post-form.component';

@Component({
  selector: 'app-post-modal-window',
  templateUrl: './post-modal-window.component.html',
  styleUrls: ['./post-modal-window.component.scss']
})
export class PostModalWindowComponent implements OnInit {
  public textCancel: string = 'Cancel';
  public textSubmit: string = 'Submit'
  public postsLength: number;

  @ViewChild(PostFormComponent) public postFormComponent: PostFormComponent;
  
  @Input() public title: string;
  @Input() public userId: number;
  @Input() public post: Post;

  @Output() public updatePosts = new EventEmitter;

  constructor(
    private postsService: PostsService,
    private modalWindowService: ModalWindowService,
    private postMapper: PostMapper
  ) { }

  public ngOnInit(): void {
    !this.post ? this.postsService.getPosts().pipe(take(1)).subscribe((posts: Post[]) => this.postsLength = posts.length) : null;
  }

  public close(): void {
    this.modalWindowService.close();
  }

  public submit(): void {
    if(this.postFormComponent.postForm.valid) {
      const post: Post = this.postMapper.mapPost(this.postFormComponent.postForm.value, this.userId, this.postsLength);
  
      if(this.post) {
        this.postsService.editPost(this.post.id.toString(), post).pipe(
          take(1), 
          catchError(err => of(`Error: ${err}`))
        ).subscribe(
          () => {
            this.closeModalMechanism();
          }
        );
      } else {
        this.postsService.postNewPost(post).pipe(
          take(1),
          catchError(err => of(`Error: ${err}`))
        ).subscribe(
          () => {
            this.closeModalMechanism();
          }
        );
      }
    }
  }

  private closeModalMechanism(): void {
    this.updatePosts.emit();
    this.postFormComponent.postForm.reset();
    this.close();
  }
}
