import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, finalize, Observable } from 'rxjs';

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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  submit(post: any) {
    this.isLoading = true;
    this.serverErrors = {};

    this.action(post).pipe(
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
