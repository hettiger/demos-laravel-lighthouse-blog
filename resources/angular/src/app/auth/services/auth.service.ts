import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LoginGQL } from '../../../generated/graphql';
import { mapRequired, transformLaravelValidationErrors } from '../../operators';
import { Credentials } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private loginGQL: LoginGQL) { }

  login(credentials: Credentials): Observable<string> {
    return this.loginGQL.mutate(
      credentials,
      { fetchPolicy: 'network-only' },
    ).pipe(
      transformLaravelValidationErrors(),
      mapRequired(result => result.data?.login.token),
    );
  }
}
