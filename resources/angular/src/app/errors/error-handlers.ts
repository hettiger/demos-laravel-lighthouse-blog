import { ErrorHandler, inject, InjectionToken } from '@angular/core';
import { AuthErrorHandler } from '../auth/errors/auth-error-handler';

export const ERROR_HANDLERS = new InjectionToken<ErrorHandler[]>(
  'ERROR_HANDLERS',
  {
    factory: () => [
      inject(AuthErrorHandler),
    ],
  },
);
