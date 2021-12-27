import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Comment } from 'src/app/interfaces/comment';

const url: string = 'http://localhost:3000/comments'

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  constructor(private http: HttpClient) { }

  private getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(url);
  }

  public getCommentsOfUser(id: number): Observable<Comment[]> {
    return this.getComments().pipe(
      map(comments => {
        return comments.filter(comment => {
          return comment.postId == id;
        })
      })
    )
  }
}
