import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { User } from 'src/app/interfaces/user';
import { UsersService } from '../../services/users/users.service'
import { Observable, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  public user$: Observable<User> | undefined;

  constructor(
    private activateRoute: ActivatedRoute,
    private location: Location,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    const id: any = this.activateRoute.snapshot.paramMap.get('id');
    this.user$ = this.usersService.getUser(id);
  }

  public goBack(): void {
    this.location.back();
  }
}
