import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApolloError } from '@apollo/client/core';
import { Router } from '@angular/router';

import { AuthErrorHandler } from './auth-error-handler';

describe('AuthErrorHandler', () => {
  let sut: AuthErrorHandler;
  let navigateSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
    });
    sut = TestBed.inject(AuthErrorHandler);
    navigateSpy = spyOn(TestBed.inject(Router), 'navigate');
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });

  function makeError(category: string) {
    return new ApolloError({
      graphQLErrors: [
        {
          extensions: {
            category,
          },
        } as any,
      ]
    });
  }

  it('redirects to "/login" page on authentication errors', () => {
    const error = makeError('authentication');

    sut.handleError(error);

    expect(navigateSpy).toHaveBeenCalledWith(['/auth/login']);
  });

  it('ignores other errors', () => {
    const error = makeError('other');

    sut.handleError(error);

    expect(navigateSpy).not.toHaveBeenCalledWith(['/auth/login']);
  });
});
