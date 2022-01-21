import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { User } from 'src/app/interfaces/user';
import { UsersService } from '../../services/users/users.service'
import { Observable } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { PostsService } from 'src/app/services/posts/posts.service';
import { ModalWindowService } from 'src/app/services/modal-window/modal-window.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  public title: string = 'User info';
  public textBack: string = 'Back';
  public textEditUser: string = 'Edit user';
  public textFirstName: string = 'User first name';
  public textLastName: string = 'User last name';
  public textNickname: string = 'User nickname';
  public textEmail: string = 'User email';
  public textAddress: string = 'User address';
  public textStreet: string = 'Street:';
  public textBuilding: string = 'Building:';
  public textCity: string = 'City:';
  public textZipcode: string = 'Zipcode:';
  public textPhone: string = 'User phone:';
  public textWebsite: string = 'User website';
  public textCompany: string = 'User company';
  public textCompanyName: string = 'Company name:';
  public textCompanyScope: string = 'Company scope:';
  public textAddPost: string = 'Add post';
  public textTitleUserModal: string = 'Please edited in the user information';
  public textTitlePostModal: string = 'Please fill in the post';
  public user: User;
  public userPosts$: Observable<Post[]>;
  public isOpenUserModal: boolean = false;
  public isOpenPostModal: boolean = false;
  private userId: any;

  constructor(
    private activateRoute: ActivatedRoute,
    private location: Location,
    private usersService: UsersService,
    private postsService: PostsService,
    private modalWindowService: ModalWindowService
  ) { }

  public ngOnInit(): void {
    this.userId = this.activateRoute.snapshot.paramMap.get('id');
    this.usersService.getUser(this.userId).subscribe(user => this.user = user);
    this.userPosts$ = this.postsService.getUserPosts(this.userId);
    this.getUseModalWindowStatus();
    this.getPostModalWindowStatus();
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
    this.isOpenUserModal = !this.isOpenPostModal;
  }

  public closeUserModal(): void {
    this.modalWindowService.close();
  }

  public openPostModal(): void {
    this.isOpenPostModal = !this.isOpenPostModal;
  }

  public closePostModal(): void {
    this.modalWindowService.close();
  }

  public getPostModalWindowStatus(): void {
    this.modalWindowService.getModalWindowStatus().subscribe(isModalOpened => {
      this.isOpenPostModal = isModalOpened;
    })
  }

  public getUseModalWindowStatus(): void {
    this.modalWindowService.getModalWindowStatus().subscribe(isModalOpened => {
      this.isOpenUserModal = isModalOpened;
    })
  }
}
