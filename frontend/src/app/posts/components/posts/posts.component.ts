import { Component, OnInit, TrackByFunction } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, pluck } from 'rxjs';

import { Post } from '../../entities';
import { PaginatorInfo } from '../../../entities';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts$: Observable<Post[]>;
  paginatorInfo$: Observable<PaginatorInfo>;

  trackByPost: TrackByFunction<Post> = (index, post) => post.id;

  constructor(activatedRoute: ActivatedRoute) {
    this.posts$ = activatedRoute.data.pipe(pluck('posts', 'data'));
    this.paginatorInfo$ = activatedRoute.data.pipe(pluck('posts', 'paginatorInfo'));
  }

  ngOnInit(): void { }
}
