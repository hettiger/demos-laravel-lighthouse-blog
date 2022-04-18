import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PostsGQL } from '../../../generated/graphql';
import { Post } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private postsGQL: PostsGQL) { }

  posts(): Observable<Post[]> {
    return this.postsGQL.watch().valueChanges.pipe(
      map(result => result.data.posts?.data.map(
        post => ({
          ...post,
          created_at: new Date(post.created_at),
          updated_at: new Date(post.updated_at)
        })
      ) ?? [])
    );
  }
}
