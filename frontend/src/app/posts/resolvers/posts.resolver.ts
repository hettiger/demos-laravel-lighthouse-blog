import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, take } from 'rxjs';

import { PostsService } from '../services/posts.service';
import { Posts } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class PostsResolver implements Resolve<Posts> {

  constructor(
    private postsService: PostsService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Posts> {
    const page = +(route.queryParams['page'] || 1);
    const perPage = +(route.queryParams['perPage'] || 5);

    if (page > 0 && perPage > 0) {
      return this.postsService.posts(page, perPage).pipe(take(1));
    }

    this.router.navigate(['.']);

    return EMPTY;
  }
}
