import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import {
  CreatePostGQL,
  DeletePostGQL,
  PostGQL,
  PostsGQL,
  UpdatePostGQL,
} from '../../../generated/graphql';
import { Post, PostResource } from '../entities';
import { mapRequired, transformLaravelValidationErrors } from '../../operators';

const POSTS_QUERY_FIELD = 'posts';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private postsGQL: PostsGQL,
    private postGQL: PostGQL,
    private createPostGQL: CreatePostGQL,
    private updatePostGQL: UpdatePostGQL,
    private deletePostGQL: DeletePostGQL,
  ) { }

  posts(): Observable<Post[]> {
    return this.postsGQL.watch().valueChanges.pipe(
      map(result => result.data.posts?.data.map(this.transform) ?? [])
    );
  }

  post(id: Post['id']): Observable<null | Post> {
    return this.postGQL.watch({ id }).valueChanges.pipe(
      map(result => result.data.post ? this.transform(result.data.post) : null),
    );
  }

  store(post: Pick<Post, 'title' | 'body'>): Observable<Post> {
    return this.createPostGQL.mutate(
      post,
      {
        update: cache => {
          cache.evict({ fieldName: POSTS_QUERY_FIELD });
          cache.gc();
        },
      },
    ).pipe(
      transformLaravelValidationErrors(),
      mapRequired(result => result.data?.createPost),
      map(post => this.transform(post)),
    );
  }

  update(post: Pick<Post, 'id' | 'title' | 'body'>): Observable<Post> {
    return this.updatePostGQL.mutate(post).pipe(
      transformLaravelValidationErrors(),
      mapRequired(result => result.data?.updatePost),
      map(post => this.transform(post)),
    );
  }

  destroy(id: Post['id']): Observable<null | Post> {
    return this.deletePostGQL.mutate(
      { id },
      {
        update: (cache, result) => {
          cache.evict({ fieldName: POSTS_QUERY_FIELD });
          cache.evict({ id: cache.identify({ id, __typename: 'Post' }) });
          cache.gc();
        },
      }
    ).pipe(
      map(result => result.data?.deletePost ? this.transform(result.data.deletePost) : null),
    );
  }

  private transform(resource: PostResource): Post {
    return {
      ...resource,
      created_at: new Date(resource.created_at),
      updated_at: new Date(resource.updated_at)
    };
  }
}
