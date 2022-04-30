import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LaravelValidationError } from '../../../errors/laravel-validation.error';
import { fadeAnimation } from '../../../animations';
import { MessageBag } from '../../../shared/entities';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
  animations: [
    fadeAnimation('fade', '150ms'),
  ]
})
export class CreatePostComponent implements OnInit {

  isLoading = false;
  serverErrors: MessageBag = {};

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private postsService: PostsService,
  ) { }

  ngOnInit(): void {
  }

  create(post: any) {
    this.isLoading = true;
    this.serverErrors = {};

    this.postsService.store(post).pipe(
      finalize(() => this.isLoading = false),
    ).subscribe({
      next: () => this.router.navigate(
        ['..'],
        { relativeTo: this.activatedRoute, replaceUrl: true }
      ),
      error: error => {
        if (error instanceof LaravelValidationError) {
          this.serverErrors = error.messageBag;
        } else {
          throw error;
        }
      },
    });
  }
}
