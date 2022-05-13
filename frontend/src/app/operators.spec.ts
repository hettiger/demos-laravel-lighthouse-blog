import { TestScheduler } from 'rxjs/testing';
import { catchError } from 'rxjs';
import { filterOptionals, mapRequired, transformLaravelValidationErrors } from './operators';
import { LaravelValidationError } from './errors/laravel-validation.error';
import { ApolloError } from '@apollo/client/core';
import { GraphQLError } from 'graphql';
import { MessageBag } from './entities';

describe('Operators', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  describe('transformLaravelValidationErrors', () => {
    const assertErrorIsTransformed = (error: Error, expectedIsTransformed: boolean) => {
      testScheduler.run(({ cold, expectObservable }) => {
        const source$ = cold('#', undefined, error);
        const expected = '            #';

        expectObservable(source$.pipe(
          transformLaravelValidationErrors(),
          catchError(error => {
            if (error instanceof LaravelValidationError) {
              throw { isTransformed: true };
            }

            throw { isTransformed: false };
          }),
        )).toBe(expected, undefined, { isTransformed: expectedIsTransformed });
      });
    }

    const graphQLError = (messageBag: MessageBag) => {
      return new GraphQLError(
        'error',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        {
          validation: messageBag
        },
      );
    }

    it('does not transforms arbitrary errors', () => {
      assertErrorIsTransformed(new Error, false);
    });

    it('does not transform Apollo network errors', () => {
      assertErrorIsTransformed(new ApolloError({
        networkError: new Error,
      }), false);
    });

    it('does not transform Apollo client errors', () => {
      assertErrorIsTransformed(new ApolloError({
        clientErrors: [new Error],
      }), false);
    });

    it('transforms ApolloErrors when Laravel validation messages are present', () => {
      assertErrorIsTransformed(new ApolloError({
        graphQLErrors: [ graphQLError({ field: ['message'] }) ],
      }), true);
    });

    it('does not transform ApolloErrors when Laravel validation messages are empty', () => {
      assertErrorIsTransformed(new ApolloError({
        graphQLErrors: [ graphQLError({}) ],
      }), false);
    });

    it('passes down the message bag to transformed errors', () => {
      testScheduler.run(({ cold, expectObservable }) => {
        const expectedMessageBag = { field: ['message'] };
        const error = new ApolloError({
          graphQLErrors: [ graphQLError(expectedMessageBag) ],
        });
        const source$ = cold('#', undefined, error);
        const expected = '            #';

        expectObservable(source$.pipe(
          transformLaravelValidationErrors(),
          catchError(error => {
            if (error instanceof LaravelValidationError) {
              throw error.messageBag;
            }

            throw error;
          }),
        )).toBe(expected, undefined, expectedMessageBag);
      });
    });
  });

  describe('filterOptionals', () => {
    it('filters null and undefined values', () => {
      testScheduler.run(({ cold, expectObservable }) => {
        const values = { a: '', b: 0, n: null, c: false, d: {}, u: undefined, f: [] };
        const source$ = cold('abncduf', values);
        const expected = '            ab-cd-f';

        expectObservable(source$.pipe(
          filterOptionals(),
        )).toBe(expected, values);
      });
    });
  });

  describe('mapRequired', () => {
    it('maps values using a given project function', () => {
      testScheduler.run(({ cold, expectObservable }) => {
        const source$ = cold('a', { a: 1 });
        const expected = '            a';

        expectObservable(source$.pipe(
          mapRequired(value => value * 2),
        )).toBe(expected, { a: 2 });
      });
    });

    it('filters null and undefined from the resulting values', () => {
      testScheduler.run(({ cold, expectObservable }) => {
        const values = { a: { v: false }, n: { v: null }, b: { v: 0 }, u: { v: undefined }, c: { v: [] } };
        const expectedValues = { a: false, b: 0, c: [] };
        const source$ = cold('anbuc', values);
        const expected = '            a-b-c';

        expectObservable(source$.pipe(
          mapRequired(value => value.v),
        )).toBe(expected, expectedValues);
      });
    });
  });
});
