import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';

const url: string = 'http://localhost:3000/users';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(url);
  }

  public postNewUser(newUser: User): Observable<User> {
    return this.http.post<User>(url, newUser);
  }

  public getUser(id: string): Observable<User> {
    return this.http.get<User>(url + '/' + id.toString());
  }
}
