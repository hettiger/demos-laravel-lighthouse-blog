import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CreatePostComponent } from './create-post.component';
import { SharedModule } from '../../../shared/shared.module';
import { PostFormComponent } from '../post-form/post-form.component';

describe('CreatePostComponent', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePostComponent, PostFormComponent ],
      imports: [ RouterTestingModule, ApolloTestingModule, SharedModule, NoopAnimationsModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
