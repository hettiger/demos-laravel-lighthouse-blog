import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';

export const fadeAnimation =
  trigger('routeAnimations', [
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
        })
      ]),
      query(':enter', [
        style({ opacity: 0 })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ opacity: 0 }))
        ]),
        query(':enter', [
          animate('300ms 300ms ease-out', style({ opacity: 1 }))
        ]),
      ]),
    ]),
  ]);
