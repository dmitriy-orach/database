import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  public PostForm: FormGroup;

  @Input() public title: string;

  @Output() public dataPost: EventEmitter<{title: string, body: string}> = new EventEmitter;

  constructor() { }

  ngOnInit(): void {
    this.PostForm = new FormGroup({
      "title": new FormControl('', Validators.required),
      "body": new FormControl('', Validators.required)
    });
  }

  public submit(): void {
    if(this.PostForm.valid) {
      const post = this.PostForm.value;
      this.dataPost.emit(post);
      this.PostForm.reset();
    }
  }
}
