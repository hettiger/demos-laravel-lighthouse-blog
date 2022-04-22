import { Component, OnInit } from '@angular/core';
import { Observable, pluck } from 'rxjs';
import { Post } from '../../entities';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts$: Observable<Post[]>;

  constructor(activatedRoute: ActivatedRoute) {
    this.posts$ = activatedRoute.data.pipe(pluck('posts'));
  }

  ngOnInit(): void { }
}
