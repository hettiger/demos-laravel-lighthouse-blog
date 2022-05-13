import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, take } from 'rxjs';
import { PostsService } from '../services/posts.service';
import { Posts } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class PostsResolver implements Resolve<Posts> {

  constructor(
    private postsService: PostsService,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Posts> {
    return this.postsService.posts(
      +(route.queryParams['page'] || 1),
      +(route.queryParams['perPage'] || 5),
    ).pipe(take(1));
  }
}
