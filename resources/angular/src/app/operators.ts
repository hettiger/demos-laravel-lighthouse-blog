import { catchError, filter, map, MonoTypeOperatorFunction, Observable, OperatorFunction } from 'rxjs';
import { isApolloError } from '@apollo/client/core';
import { LaravelValidationError } from './errors/laravel-validation.error';

/**
 * Catches and transforms Laravel validation errors;
 * then rethrows the transformed error.
 *
 * The transformed error provides a Laravel like messageBag.
 */
export function transformLaravelValidationErrors<T>(): MonoTypeOperatorFunction<T> {
  return function <T>(source: Observable<T>) {
    return source.pipe(
      catchError(error => {
        if (
          !isApolloError(error)
          || error.networkError
          || error.clientErrors.length
        ) {
          throw error;
        }

        const messageBag = error.graphQLErrors.map(
          gqlErrors => gqlErrors.extensions['validation'] || {}
        )[0] as {};

        if (!Object.keys(messageBag).length) {
          throw error;
        }

        throw new LaravelValidationError(messageBag);
      }),
    );
  };
}

/**
 * Filters null and undefined from T
 */
export function filterOptionals<T>(): OperatorFunction<T, NonNullable<T>> {
  return function <T>(source: Observable<T>) {
    return source.pipe(
      filter(<T>(value: T): value is NonNullable<T> => value !== null && value !== undefined),
    );
  }
}

/**
 * Maps values using a project function;
 * then filters null and undefined from R.
 */
export function mapRequired<T, R>(
  project: (value: T, index: number) => R
): OperatorFunction<T, NonNullable<R>> {
  return function(source) {
    return source.pipe(
      map(project),
      filterOptionals(),
    );
  }
}
