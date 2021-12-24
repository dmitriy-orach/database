import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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

  public getUserPosts(userId: number): Observable<Post[]> {
    return this.getPosts().pipe(
      map(posts => {
        return posts.filter(post => {
          return post.userId == userId;
        })
      })
    )
  }
}
