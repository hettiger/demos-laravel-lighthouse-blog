import { ErrorHandler, Inject, Injectable } from '@angular/core';
import { isUncaughtPromiseError } from '../predicates';
import { ERROR_HANDLERS } from './error-handlers';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    @Inject(ERROR_HANDLERS) private errorHandlers: ErrorHandler[],
  ) {}

  handleError(error: unknown): void {
    if (isUncaughtPromiseError(error)) {
      this.handleError(error.rejection);
      return;
    }

    for (const errorHandler of this.errorHandlers) {
      this.ngZone.run(() => {
        errorHandler.handleError(error);
      });
    }
  }
}
