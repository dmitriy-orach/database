import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'database';
  public isAuth: boolean;

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.auth.isAuthenticated().then(response => {
      this.isAuth = response;
    });
  }

  public login(): void {
    this.auth.login();
    this.auth.isAuthenticated().then(response => {
      this.isAuth = response;
    });
  }

  public logout(): void {
    this.auth.logout();
    this.auth.isAuthenticated().then(response => {
      this.isAuth = response;
    });
  }
}
