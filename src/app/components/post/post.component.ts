import { Component, EventEmitter, Input, Output } from '@angular/core';
import { take } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  @Input() post: Post;
  
  @Output() isUpdate: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor( private postsService: PostsService ) { }

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

  public updatePost(event: any): any {
    if(!!event) {
      this.postsService.getPost(this.post.id).pipe(take(1)).subscribe(post => this.post = post);
    }
  }
}
