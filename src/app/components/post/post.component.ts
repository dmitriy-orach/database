import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { take, Observable, catchError, of } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { ModalWindowService } from 'src/app/services/modal-window/modal-window.service';
import { PostsService } from 'src/app/services/posts/posts.service';
import { Comment } from '../../interfaces/comment';
import { CommentsService } from './../../services/comments/comments.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  public comments$: Observable<Comment[]>;
  public toggle: boolean = false;
  public isOpenPostModal: boolean = false;

  @Input() public post: Post;
  
  @Output() public isUpdate: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor(
    private postsService: PostsService,
    private  commentsService: CommentsService,
    private modalWindowService: ModalWindowService
  ) { }

  public ngOnInit(): void {
    this.comments$ = this.commentsService.getCommentsOfUser(this.post.id);
  }

  public removePost(): void {
    this.postsService.removePost(this.post.id.toString()).pipe(
      take(1), 
      catchError(err => of(`Error: ${err}`))
    ).subscribe(
      data => {
        console.log("DELETE Request is successful ", data);
        this.isUpdate.emit(true);
      }
    );
  }

  public updatePosts(): void {
      this.closePostModal();
      this.postsService.getPost(this.post.id.toString()).pipe(take(1)).subscribe(post => this.post = post);
  }

  public toggleComments(): void {
    this.toggle = !this.toggle;
  }

  public openPostModal(): void {
    this.isOpenPostModal = this.modalWindowService.open();
  }

  public closePostModal(): void {
    this.isOpenPostModal = this.modalWindowService.close();
  }
}
