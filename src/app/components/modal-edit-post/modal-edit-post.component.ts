import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/interfaces/post';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-modal-edit-post',
  templateUrl: './modal-edit-post.component.html',
  styleUrls: ['./modal-edit-post.component.scss']
})
export class ModalEditPostComponent implements OnInit {
  public opened = false;
  public editPostForm: FormGroup;

  @Input() post: Post;

  @Output() isEdited: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.editPostForm = new FormGroup({
      "title": new FormControl(`${this.post.title}`, Validators.required),
      "body": new FormControl(`${this.post.body}`, Validators.required),
    });
  }

  public close(): void {
    this.opened = false;
  }

  public open(): void {
    this.opened = true;
  }

  public submit(): void {
    const editedPost: Post = {
      id: this.post.id,
      userId: this.post.userId,
      title: this.editPostForm.value.title,
      body: this.editPostForm.value.body,
    };

    this.postsService.editPost(this.post.id.toString(), editedPost).subscribe(
      (data: any) => {
        this.isEdited.emit(data);
      },
      (error: any)  => console.log(error)
    );
    this.editPostForm.reset();
    this.close();
  }
}
