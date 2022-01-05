import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { getUserByIdLink, getUsersLink } from 'src/assets/variables';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(getUsersLink);
  }

  public postNewUser(newUser: User): Observable<User> {
    return this.http.post<User>(getUsersLink, newUser);
  }

  public getUser(id: string): Observable<User> {
    return this.http.get<User>(getUserByIdLink.replace('${id}', id));
  }

  public editUser(id: string, editUser: User): Observable<User> {
    return this.http.put<User>(getUserByIdLink.replace('${id}', id), editUser);
  }
}
