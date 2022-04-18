import { TestBed } from '@angular/core/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';

import { PostsService } from './posts.service';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ApolloTestingModule ]
    });
    service = TestBed.inject(PostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
