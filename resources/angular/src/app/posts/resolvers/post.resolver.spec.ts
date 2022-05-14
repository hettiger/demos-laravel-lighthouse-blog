import { TestBed } from '@angular/core/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PostResolver } from './post.resolver';

describe('PostResolver', () => {
  let resolver: PostResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ApolloTestingModule, RouterTestingModule ],
    });
    resolver = TestBed.inject(PostResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
