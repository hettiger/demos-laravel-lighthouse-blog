import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, pluck, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Post } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private httpClient: HttpClient) { }

  posts(): Observable<Post[]> {
    return this.httpClient.post<{
      data: {
        posts: {
          data: {
            id: number;
            user: {
              id: number;
              name: string;
            };
            title: string;
            body: string;
            created_at: string;
            updated_at: string;
          }[];
        };
      };
    }>(environment.backendURL, {
      query: `
        query {
          posts {
            data {
              id
              user {
                id
                name
              }
              title
              body
              created_at
              updated_at
            }
          }
        }
      `,
    }).pipe(
      pluck('data', 'posts', 'data'),
      map(posts => posts.map(
        post => ({
          ...post,
          created_at: new Date(post.created_at),
          updated_at: new Date(post.updated_at)
        })
      )),
      tap(posts => console.log('Fetched posts', posts)),
    );
  }
}
