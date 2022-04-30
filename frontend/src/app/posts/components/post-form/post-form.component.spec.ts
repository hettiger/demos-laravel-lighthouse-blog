import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';

import { PostFormComponent } from './post-form.component';
import { SharedModule } from '../../../shared/shared.module';
import { of } from 'rxjs';
import { Post } from '../../entities';

describe('PostFormComponent', () => {
  let component: PostFormComponent;
  let fixture: ComponentFixture<PostFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostFormComponent ],
      imports: [ RouterTestingModule, FormsModule, SharedModule, NoopAnimationsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('submit', () => {
    it('redirects back on success', () => {
      const routerSpy = spyOn(TestBed.inject(Router), 'navigate');
      component.action = () => of({} as Post);

      component.submit({});

      expect(routerSpy).toHaveBeenCalledOnceWith(
        ['..'],
        { relativeTo: TestBed.inject(ActivatedRoute), replaceUrl: true },
      )
    });
  });
});
