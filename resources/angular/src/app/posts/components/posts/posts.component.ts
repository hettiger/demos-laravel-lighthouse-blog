import { Component, OnInit, TrackByFunction } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, pluck } from 'rxjs';
import { transition, trigger, useAnimation } from '@angular/animations';

import { Post } from '../../entities';
import { PaginatorInfo } from '../../../entities';
import { listAnimation } from '../../../animations';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  animations: [
    trigger('list', [
      transition('* => *', [
        useAnimation(listAnimation, { params: {
          duration: '150ms',
        }}),
      ])
    ])
  ]
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
