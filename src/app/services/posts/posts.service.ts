import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { getPostById, getPostsLink } from 'src/assets/variables';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  public getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(getPostsLink);
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

  public postNewPost(newPost: Post): Observable<Post> {
    return this.http.post<Post>(getPostsLink, newPost);
  }

  public editPost(id: string, editedPost: Post): Observable<Post> {
    return this.http.put<Post>(getPostById.replace('${id}', id), editedPost);
  }

  public getPost(id: string): Observable<Post> {
    return this.http.get<Post>(getPostById.replace('${id}', id));
  }

  public removePost(id: string): Observable<Post> {
    return this.http.delete<Post>(getPostById.replace('${id}', id));
  }
}
