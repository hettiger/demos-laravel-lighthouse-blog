import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, finalize, Observable, pluck } from 'rxjs';

import { MessageBag } from '../../../shared/entities';
import { fadeAnimation } from '../../../animations';
import { LaravelValidationError } from '../../../errors/laravel-validation.error';
import { Post } from '../../entities';

export type PostFormAction = (post: any) => Observable<Post>;

export interface PostFormOptions {
  title: string;
  buttonLabel: string;
}

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
  animations: [
    fadeAnimation('fade', '150ms'),
  ]
})
export class PostFormComponent implements OnInit {

  @Input() action: PostFormAction = () => EMPTY;
  @Input() options: PostFormOptions = { title: 'Post', buttonLabel: 'OK' };

  isLoading = false;
  serverErrors: MessageBag = {};
  post?: Post;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(pluck('post')).subscribe(
      post => this.post = post
    );
  }

  submit(post: any) {
    this.isLoading = true;
    this.serverErrors = {};

    this.action({
      id: this.post ? this.post.id : undefined,
      ...post
    }).pipe(
      finalize(() => this.isLoading = false),
    ).subscribe({
      next: () => this.router.navigate(
        ['..'],
        { relativeTo: this.activatedRoute, replaceUrl: true }
      ),
      error: (error: unknown) => {
        if (error instanceof LaravelValidationError) {
          this.serverErrors = error.messageBag;
        } else {
          throw error;
        }
      },
    });
  }
}
