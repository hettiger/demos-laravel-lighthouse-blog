import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ChildrenOutletContexts,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { fadeRoutesAnimation } from './animations';
import { animate, style, transition, trigger, useAnimation } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('progressBarAnimations', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('150ms', style({ opacity: 0 })),
      ]),
    ]),
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

  constructor(private router: Router, private contexts: ChildrenOutletContexts) { }

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
