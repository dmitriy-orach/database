import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { User } from 'src/app/interfaces/user';
import { UsersService } from '../../services/users/users.service'
import { Observable } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  public user$: Observable<User> | undefined;
  public userPosts$: Observable<Post[]> | undefined;
  private userId: any;

  constructor(
    private activateRoute: ActivatedRoute,
    private location: Location,
    private usersService: UsersService,
    private postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.userId = this.activateRoute.snapshot.paramMap.get('id');
    this.user$ = this.usersService.getUser(this.userId);
    this.userPosts$ = this.postsService.getUserPosts(this.userId);
  }

  public goBack(): void {
    this.location.back();
  }

  public updateUser(event: any): any {
    if(!!event) {
      this.user$ = this.usersService.getUser(this.userId);
    }
  }

  public updatePosts(event: any): any {
    if(!!event) {
      this.userPosts$ = this.postsService.getUserPosts(this.userId);
    }
  }
}
