import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PostGQL, PostsGQL } from '../../../generated/graphql';
import { Post, PostResource } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private postsGQL: PostsGQL,
    private postGQL: PostGQL
  ) { }

  posts(): Observable<Post[]> {
    return this.postsGQL.watch().valueChanges.pipe(
      map(result => result.data.posts?.data.map(this.transform) ?? [])
    );
  }

  post(id: Post['id']): Observable<Post | null> {
    return this.postGQL.watch({ id }).valueChanges.pipe(
      map(result => (result.data.post ? this.transform(result.data.post) : null)
    ));
  }

  private transform(resource: PostResource): Post {
    return {
      ...resource,
      created_at: new Date(resource.created_at),
      updated_at: new Date(resource.updated_at)
    };
  }
}
