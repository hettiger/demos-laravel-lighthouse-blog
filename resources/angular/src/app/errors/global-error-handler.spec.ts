import { TestBed } from '@angular/core/testing';
import { GlobalErrorHandler } from './global-error-handler';
import { ERROR_HANDLERS } from './error-handlers';
import { ErrorHandler } from '@angular/core';

describe('GlobalErrorHandler', () => {
  let sut: GlobalErrorHandler;
  let errorHandlerSpyA: jasmine.SpyObj<ErrorHandler>;
  let errorHandlerSpyB: jasmine.SpyObj<ErrorHandler>;

  beforeEach(() => {
    errorHandlerSpyA = jasmine.createSpyObj('ErrorHandler', ['handleError']);
    errorHandlerSpyB = jasmine.createSpyObj('ErrorHandler', ['handleError']);
    TestBed.configureTestingModule({
      providers: [
        { provide: ERROR_HANDLERS, useValue: [errorHandlerSpyA, errorHandlerSpyB] },
      ],
    });

    sut = TestBed.inject(GlobalErrorHandler);
  });

  it('unwraps uncaught promise errors', () => {
    const handleErrorSpy = spyOn(sut, 'handleError').and.callThrough();
    const error = new Error() as any;
    error.rejection = new Error('rejection');

    sut.handleError(error);

    expect(handleErrorSpy).toHaveBeenCalledWith(error.rejection);
  });

  it('delegates to registered error handlers', () => {
    const error = new Error();

    sut.handleError(error);

    expect(errorHandlerSpyA.handleError).toHaveBeenCalledOnceWith(error);
    expect(errorHandlerSpyB.handleError).toHaveBeenCalledOnceWith(error);
  });
});
