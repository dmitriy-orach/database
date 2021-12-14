import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { User } from 'src/app/interfaces/user';
import { UsersService } from '../../services/users/users.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  public user$: Observable<User> | undefined;
  private userId: any;

  constructor(
    private activateRoute: ActivatedRoute,
    private location: Location,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.userId = this.activateRoute.snapshot.paramMap.get('id');
    this.user$ = this.usersService.getUser(this.userId);
  }

  public goBack(): void {
    this.location.back();
  }

  public updateUser(event: any): any {
    if(!!event) {
      this.user$ = this.usersService.getUser(this.userId);
    }
  }
}
