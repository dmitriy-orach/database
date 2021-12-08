import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { PostService } from '../../services/users/users.service'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  public users: User[] = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getUsers().pipe(take(1)).subscribe((users) => {
      this.users = users;
    })
  }

  public addUser(): void {
    
  }
}
