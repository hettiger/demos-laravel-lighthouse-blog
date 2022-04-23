import { animate, animation, query, style } from '@angular/animations';

export const fadeRoutesAnimation = animation( [
  style({ position: 'relative' }),
  query(':enter, :leave', [
    style({ position: 'absolute', top: 0, left: 0, right: 0 })
  ], { optional: true }),
  query(':enter', [
    style({ opacity: 0 })
  ], { optional: true }),
  query(':leave', [
    animate('{{ duration }}', style({ opacity: 0 }))
  ], { optional: true }),
  query(':enter', [
    animate('{{ duration }}', style({ opacity: 1 }))
  ], { optional: true }),
]);
