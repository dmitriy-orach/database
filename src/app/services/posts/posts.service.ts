import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/interfaces/post';

const url: string = 'http://localhost:3000/posts'

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  public getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(url);
  }

  public getUserPosts(userId: string): Observable<Post[]> {
    return this.http.get<Post[]>(url + '/' + userId);
  }
}
