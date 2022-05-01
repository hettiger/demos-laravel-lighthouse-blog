import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { PostFormComponent } from './post-form.component';
import { SharedModule } from '../../../shared/shared.module';
import { Post } from '../../entities';
import { BackButtonDirective } from '../../../shared/directives/back-button.directive';

describe('PostFormComponent', () => {
  let component: PostFormComponent;
  let fixture: ComponentFixture<PostFormComponent>;
  let debugElement: DebugElement;

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
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('cancel', () => {
    it('navigates back', () => {
      expect(debugElement.queryAll(By.directive(BackButtonDirective)).filter(
        (button) => button.nativeElement.textContent === 'Cancel',
      ).length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('submit', () => {
    it('navigates back on success', () => {
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
