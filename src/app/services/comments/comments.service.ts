import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Comment } from 'src/app/interfaces/comment';
import { link } from 'src/assets/variables';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  constructor(private http: HttpClient) { }

  private getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(link.replace('${}', 'comments'));
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
