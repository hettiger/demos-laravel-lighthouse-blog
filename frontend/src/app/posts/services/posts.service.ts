import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  CreatePostGQL,
  CreatePostMutationVariables,
  DeletePostGQL,
  DeletePostMutationVariables,
  PostGQL,
  PostQueryVariables,
  PostsGQL,
  UpdatePostGQL,
  UpdatePostMutationVariables
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

  post(id: PostQueryVariables['id']): Observable<Post | null> {
    return this.postGQL.watch({ id }).valueChanges.pipe(
      map(result => (result.data.post ? this.transform(result.data.post) : null)
    ));
  }

  store(document: CreatePostMutationVariables) {
    return this.createPostGQL.mutate(
      document,
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

  update(document: UpdatePostMutationVariables) {
    return this.updatePostGQL.mutate(document).pipe(
      transformLaravelValidationErrors(),
      mapRequired(result => result.data?.updatePost),
      map(post => this.transform(post)),
    );
  }

  destroy(id: DeletePostMutationVariables['id']): Observable<Post | null> {
    return this.deletePostGQL.mutate(
      { id },
      {
        update: (cache, result) => {
          const deletedPost = result.data?.deletePost;
          if (!deletedPost) { return; }
          cache.evict({ fieldName: POSTS_QUERY_FIELD });
          cache.evict({ id: cache.identify(deletedPost) });
          cache.gc();
        },
      }
    ).pipe(
      mapRequired(result => result.data?.deletePost),
      map(post => this.transform(post)),
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
