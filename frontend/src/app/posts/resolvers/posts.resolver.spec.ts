import { TestBed } from '@angular/core/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PostsResolver } from './posts.resolver';

describe('PostsResolver', () => {
  let resolver: PostsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ApolloTestingModule, RouterTestingModule ],
    });
    resolver = TestBed.inject(PostsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
