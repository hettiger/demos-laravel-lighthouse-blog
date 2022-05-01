import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, pluck } from 'rxjs';
import { Post } from '../../entities';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post$: Observable<Post>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private postsService: PostsService,
  ) {
    this.post$ = this.activatedRoute.data.pipe(pluck('post'));
  }

  ngOnInit(): void { }

  destroy(post: Post) {
    this.postsService.destroy(post.id).subscribe(
      () => this.router.navigate(['..'], { relativeTo: this.activatedRoute }),
    );
  }
}
