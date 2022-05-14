import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { EditPostComponent } from './edit-post.component';
import { SharedModule } from '../../../shared/shared.module';
import { PostFormComponent } from '../post-form/post-form.component';

describe('EditPostComponent', () => {
  let component: EditPostComponent;
  let fixture: ComponentFixture<EditPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPostComponent, PostFormComponent ],
      imports: [ RouterTestingModule, ApolloTestingModule, SharedModule, NoopAnimationsModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
