import { animate, query, style, transition, trigger } from '@angular/animations';

export const fadeAnimation =
  trigger('routeAnimations', [
    transition('* => *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({ position: 'absolute', top: 0, left: 0, right: 0 })
      ]),
      query(':enter', [
        style({ opacity: 0 })
      ]),
      query(':leave', [
        animate('150ms', style({ opacity: 0 }))
      ], { optional: true }),
      query(':enter', [
        animate('150ms', style({ opacity: 1 }))
      ]),
    ]),
  ]);
