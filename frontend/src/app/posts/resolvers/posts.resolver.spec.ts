import { TestBed } from '@angular/core/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';

import { PostsResolver } from './posts.resolver';

describe('PostsResolver', () => {
  let resolver: PostsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ApolloTestingModule ],
    });
    resolver = TestBed.inject(PostsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
