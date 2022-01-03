import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { take, Observable } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { PostsService } from 'src/app/services/posts/posts.service';
import { Comment } from '../../interfaces/comment';
import { CommentsService } from './../../services/comments/comments.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  public comments$: Observable<Comment[]> | undefined;
  public toggle: boolean = false;

  @Input() post: Post;
  
  @Output() isUpdate: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor(
    private postsService: PostsService,
    private  commentsService: CommentsService  
  ) { }

  ngOnInit() {
    this.comments$ = this.commentsService.getCommentsOfUser(this.post.id);
  }

  public removePost(): void {
    this.postsService.removePost(this.post.id).subscribe(
      data => {
        console.log("DELETE Request is successful ", data);
        this.isUpdate.emit(true);
      },
      error => {
        console.log("Error", error);
      }
    );
  }

  public updatePosts(): void {
      this.postsService.getPost(this.post.id).pipe(take(1)).subscribe(post => this.post = post);
  }

  public toggleComments(): void {
    this.toggle = !this.toggle;
  }
}
