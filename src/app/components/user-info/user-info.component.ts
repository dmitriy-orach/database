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
  public user$: Observable<User>;
  public userPosts$: Observable<Post[]>;
  private userId: any;

  constructor(
    private activateRoute: ActivatedRoute,
    private location: Location,
    private usersService: UsersService,
    private postsService: PostsService
  ) { }

  public ngOnInit(): void {
    this.userId = this.activateRoute.snapshot.paramMap.get('id');
    this.user$ = this.usersService.getUser(this.userId);
    this.userPosts$ = this.postsService.getUserPosts(this.userId);
  }

  public goBack(): void {
    this.location.back();
  }

  public updateUser(): void {
    this.user$ = this.usersService.getUser(this.userId);
  }

  public updatePosts(): void {
    this.userPosts$ = this.postsService.getUserPosts(this.userId);
  }
}
