import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { environment } from '../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';
import { onError } from '@apollo/client/link/error';

const uri = environment.backendURL;
export function createApollo(
  httpLink: HttpLink,
  httpClient: HttpClient,
  httpXsrfTokenExtractor: HttpXsrfTokenExtractor
): ApolloClientOptions<any> {
  const addCsrfToken = new ApolloLink((operation, forward) => {
    const token = httpXsrfTokenExtractor.getToken();
    const headers = operation.getContext()['headers'] ?? new HttpHeaders();

    if (token) {
      operation.setContext({
        headers: headers.set('X-XSRF-TOKEN', token),
      });
    }

    return forward(operation);
  });

  const addBearerToken = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('token');
    const headers = operation.getContext()['headers'] ?? new HttpHeaders();

    if (token) {
      operation.setContext({
        headers: headers.set('Authorization', `Bearer ${token}`),
      });
    }

    return forward(operation);
  });

  const updateInvalidCsrfToken = onError(({ networkError }) => {
    if (!(networkError instanceof HttpErrorResponse)) return;
    switch (networkError.status) {
      case 419: {
        httpClient.get('/sanctum/csrf-cookie').subscribe();
        break;
      }
    }
  });

  return {
    link: addCsrfToken
      .concat(updateInvalidCsrfToken)
      .concat(addBearerToken)
      .concat(httpLink.create({ uri })),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, HttpClient, HttpXsrfTokenExtractor],
    },
  ],
})
export class GraphQLModule {}
