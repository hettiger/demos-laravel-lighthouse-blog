import { catchError, Observable } from 'rxjs';
import { isApolloError } from '@apollo/client/core';
import { LaravelValidationError } from './errors/laravel-validation.error';

export function transformLaravelValidationErrors() {
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
