import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { fadeAnimation, fadeRoutesAnimation } from './animations';
import { transition, trigger, useAnimation } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fadeAnimation('fade', '150ms'),
    trigger('routeAnimations', [
      transition('* => *', [
        useAnimation(fadeRoutesAnimation, { params: {
          duration: '300ms',
        }}),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit, OnDestroy {

  isLoading = false;

  destroy$ = new Subject();

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.isLoading = true;
          break;
        }
        case event instanceof NavigationCancel:
        case event instanceof NavigationEnd:
        case event instanceof NavigationError: {
          this.isLoading = false;
          break;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
