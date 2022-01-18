import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { take } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { ModalWindowService } from 'src/app/services/modal-window/modal-window.service';
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

  constructor(
    private postsService: PostsService,
    private modalWindowService: ModalWindowService
  ) { }

  public ngOnInit(): void {
    this.postsService.getPosts().pipe(take(1)).subscribe((posts: Post[]) => this.postsLength = posts.length);
  }

  public close(): void {
    this.modalWindowService.close();
  }

  public submit(): void {
    this.postForm.submit();
  }

  public refreshPosts(): void {
    this.updatePosts.emit();
  }
}
