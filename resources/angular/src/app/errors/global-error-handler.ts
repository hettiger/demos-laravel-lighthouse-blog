import { ErrorHandler, Inject, Injectable, NgZone } from '@angular/core';
import { isUncaughtPromiseError } from '../predicates';
import { ERROR_HANDLERS } from './error-handlers';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    @Inject(ERROR_HANDLERS) private errorHandlers: ErrorHandler[],
    private ngZone: NgZone,
  ) {}

  handleError(error: unknown): void {
    if (isUncaughtPromiseError(error)) {
      this.ngZone.run(() => {
        this.handleError(error.rejection);
      });
      return;
    }

    for (const errorHandler of this.errorHandlers) {
      this.ngZone.run(() => {
        errorHandler.handleError(error);
      });
    }
  }
}
