import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';
import { LaravelValidationError } from '../../../errors/laravel-validation.error';
import { transition, trigger, useAnimation } from '@angular/animations';
import { durationParams, fadeInAnimation, fadeOutAnimation } from '../../../animations';
import { MessageBag } from '../../../shared/entities';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        useAnimation(fadeInAnimation, { params: durationParams('150ms') }),
      ]),
      transition(':leave', [
        useAnimation(fadeOutAnimation, { params: durationParams('150ms') }),
      ]),
    ]),
  ]
})
export class CreatePostComponent implements OnInit {

  serverErrors: MessageBag = {};

  constructor(
    private location: Location,
    private router: Router,
    private postsService: PostsService,
  ) { }

  ngOnInit(): void {
  }

  cancel() {
    this.location.back();
  }

  create(post: any) {
    this.serverErrors = {};
    this.postsService.store(post).subscribe({
      next: () => this.router.navigate(['..']),
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
