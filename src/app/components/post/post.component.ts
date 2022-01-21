import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { take, Observable, catchError, of, takeUntil } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { ModalWindowService } from 'src/app/services/modal-window/modal-window.service';
import { PostsService } from 'src/app/services/posts/posts.service';
import { Comment } from '../../interfaces/comment';
import { BaseComponent } from '../base/base.component';
import { CommentsService } from './../../services/comments/comments.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent extends BaseComponent implements OnInit {
  public textEditPost: string = 'Edit post';
  public textRemovePost: string = 'Remove';
  public textShowComments: string = 'Show comments';
  public textHideComments: string = 'Hide comments';
  public textTitlePostModal: string = 'Please fill in the new post';
  public comments$: Observable<Comment[]>;
  public toggle: boolean = false;
  public isOpenPostModal: boolean = false;

  @Input() public post: Post;
  
  @Output() public isUpdate: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor(
    private postsService: PostsService,
    private commentsService: CommentsService,
    private modalWindowService: ModalWindowService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.comments$ = this.commentsService.getCommentsOfUser(this.post.id);
    this.getModalWindowStatus();
  }

  public removePost(): void {
    this.postsService.removePost(this.post.id.toString()).pipe(
      takeUntil(this.destroyed),
      catchError(err => of(`Error: ${err}`))
    ).subscribe(
      data => {
        this.isUpdate.emit(true);
      }
    );
  }

  public updatePosts(): void {
      this.closePostModal();
      this.postsService.getPost(this.post.id.toString()).pipe(
        takeUntil(this.destroyed),
      ).subscribe(post => this.post = post);
  }

  public toggleComments(): void {
    this.toggle = !this.toggle;
  }

  public openPostModal(): void {
    this.isOpenPostModal = !this.isOpenPostModal;
  }

  public closePostModal(): void {
    this.modalWindowService.close();
  }

  private getModalWindowStatus(): void {
    this.modalWindowService.getModalWindowStatus().subscribe(isModalOpened => {
      this.isOpenPostModal = isModalOpened;
    })
  }
}
