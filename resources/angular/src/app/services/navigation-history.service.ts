import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationHistoryService implements OnDestroy {

  get history() {
    return this._history;
  }

  private _history: string[] = [];

  private destroy$ = new Subject();

  constructor(private router: Router) {
    this.router.events.pipe(
      takeUntil(this.destroy$),
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    ).subscribe(event => {
      this._history.push(event.urlAfterRedirects);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
