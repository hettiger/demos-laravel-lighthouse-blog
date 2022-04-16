import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Observable, of } from 'rxjs';
import { Post } from '../../entities';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts$: Observable<Post[]> = of([]);

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.posts$ = this.postsService.posts();
  }
}
