import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import {
  CreatePostGQL,
  CreatePostMutation,
  CreatePostMutationVariables,
  PostGQL,
  PostQueryVariables,
  PostsGQL
} from '../../../generated/graphql';
import { Post, PostResource } from '../entities';
import { filterOptionals, mapRequired, transformLaravelValidationErrors } from '../../operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private postsGQL: PostsGQL,
    private postGQL: PostGQL,
    private createPostGQL: CreatePostGQL,
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
    return this.createPostGQL.mutate(document).pipe(
      transformLaravelValidationErrors(),
      mapRequired(result => result.data?.createPost),
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
