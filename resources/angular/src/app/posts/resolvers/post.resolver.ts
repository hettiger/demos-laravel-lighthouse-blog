import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, mergeMap, Observable, of, take } from 'rxjs';
import { Post } from '../entities';
import { PostsService } from '../services/posts.service';

@Injectable({
  providedIn: 'root'
})
export class PostResolver implements Resolve<Post> {

  constructor(
    private postsService: PostsService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post> {
    const id = route.paramMap.get('id') ?? '';

    return this.postsService.post(id).pipe(
      take(1),
      mergeMap(post => {
        if (post) {
          return of(post);
        }

        this.router.navigate(['/not-found']);

        return EMPTY;
      })
    );
  }
}
