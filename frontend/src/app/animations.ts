import { animate, animation, query, style, useAnimation } from '@angular/animations';

export function durationParams(duration: string) {
  return { duration };
}

export const fadeInAnimation = animation([
  style({ opacity: 0 }),
  animate('{{ duration }}', style({ opacity: 1 })),
]);

export const fadeOutAnimation = animation([
  animate('{{ duration }}', style({ opacity: 0 })),
]);

export const fadeRoutesAnimation = animation( [
  style({ position: 'relative' }),
  query(':enter, :leave', [
    style({ position: 'absolute', top: 0, left: 0, right: 0 })
  ], { optional: true }),
  query(':enter', [
    style({ opacity: 0 })
  ], { optional: true }),
  query(':leave', [
    useAnimation(fadeOutAnimation, { params: durationParams('{{ duration }}')}),
  ], { optional: true }),
  query(':enter', [
    useAnimation(fadeInAnimation, { params: durationParams('{{ duration }}')}),
  ], { optional: true }),
]);
