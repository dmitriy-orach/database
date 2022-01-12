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
  public user: User;
  public userPosts$: Observable<Post[]>;
  public isOpenUserModal: boolean = false;
  public isOpenPostModal: boolean = false;
  private userId: any;

  constructor(
    private activateRoute: ActivatedRoute,
    private location: Location,
    private usersService: UsersService,
    private postsService: PostsService
  ) { }

  public ngOnInit(): void {
    this.userId = this.activateRoute.snapshot.paramMap.get('id');
    this.usersService.getUser(this.userId).subscribe(user => this.user = user);
    this.userPosts$ = this.postsService.getUserPosts(this.userId);
  }

  public goBack(): void {
    this.location.back();
  }

  public updateUser(): void {
    this.closeUserModal();
    this.usersService.getUser(this.userId).subscribe(user => this.user = user);
  }

  public updatePosts(): void {
    this.closePostModal();
    this.userPosts$ = this.postsService.getUserPosts(this.userId);
  }

  public openUserModal(): void {
    this.isOpenUserModal = !this.isOpenUserModal;
  }

  public closeUserModal(): void {
    this.isOpenUserModal = !this.isOpenUserModal;
  }

  public openPostModal(): void {
    this.isOpenPostModal = !this.isOpenPostModal;
  }

  public closePostModal(): void {
    this.isOpenPostModal = !this.isOpenPostModal;
  }
}
