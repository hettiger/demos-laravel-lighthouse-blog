import { ErrorHandler, Injectable } from '@angular/core';
import { ApolloError } from '@apollo/client/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthErrorHandler implements ErrorHandler {

  constructor(private router: Router) { }

  handleError(error: any): void {
    if (!this.canHandle(error)) { return; }

    this.router.navigate(['/login']);
  }

  private canHandle(error: any): error is ApolloError {
    if (!(error instanceof ApolloError)) { return false; }

    return error.graphQLErrors.some(
      (error) => error.extensions['category'] === 'authentication'
    );
  }
}
