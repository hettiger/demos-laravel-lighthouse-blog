import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, take } from 'rxjs';
import { PostsService } from '../services/posts.service';
import { Post } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class PostsResolver implements Resolve<Post[]> {

  constructor(
    private postsService: PostsService,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post[]> {
    return this.postsService.posts().pipe(take(1));
  }
}
