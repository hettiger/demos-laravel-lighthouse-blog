import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CreatePostComponent } from './create-post.component';
import { SharedModule } from '../../../shared/shared.module';
import { PostsService } from '../../services/posts.service';
import { of } from 'rxjs';
import { Post } from '../../entities';
import { ActivatedRoute, Router } from '@angular/router';

describe('CreatePostComponent', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;
  let postsService: PostsService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePostComponent ],
      imports: [ RouterTestingModule, ApolloTestingModule, SharedModule, NoopAnimationsModule ],
    })
    .compileComponents();

    postsService = TestBed.inject(PostsService);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('create', () => {
    it('redirects back on success', () => {
      const postsServiceSpy = spyOn(postsService, 'store');
      postsServiceSpy.and.returnValue(of({} as Post));
      const routerSpy = spyOn(router, 'navigate');

      component.create({});

      expect(routerSpy).toHaveBeenCalledOnceWith(
        ['..'],
        { relativeTo: TestBed.inject(ActivatedRoute), replaceUrl: true },
      )
    });
  });
});
