import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-modal-new-post',
  templateUrl: './modal-new-post.component.html',
  styleUrls: ['./modal-new-post.component.scss']
})
export class ModalNewPostComponent implements OnInit {
  private postsLength: number;

  public opened = false;
  public dataSaved = false;
  public newPostForm: FormGroup;
  
  @Input() userId: number;

  @Output() isUpdate: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.newPostForm = new FormGroup({
      "title": new FormControl('', Validators.required),
      "body": new FormControl('', Validators.required)
    });
    this.postsService.getPosts().pipe(take(1)).subscribe((posts: Post[]) => this.postsLength = posts.length);
  }

  public close(): void {
    this.opened = false;
  }

  public open(): void {
    this.opened = true;
  }

  public submit(): void {
    const newPost: Post = {
      id: this.postsLength + 1,
      userId: this.userId,
      title: this.newPostForm.value.title,
      body: this.newPostForm.value.body
    }

    this.postsService.postNewPost(newPost).subscribe(
      (data: any) => {
        this.dataSaved = true;
        this.isUpdate.emit(data);
      },
      (error: any)  => console.log(error)
    );

    this.newPostForm.reset();
    this.close();
  }
}
