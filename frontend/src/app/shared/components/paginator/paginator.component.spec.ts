import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

import { PaginatorComponent } from './paginator.component';
import { SharedModule } from '../../shared.module';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginatorComponent ],
      imports: [ SharedModule, NoopAnimationsModule, RouterTestingModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('navigate', () => {
    it('should navigate to the same page with updated pagination params', () => {
      const navigateSpy = spyOn(TestBed.inject(Router), 'navigate');

      component.navigate({
        pageIndex: 3,
        pageSize: 7,
      } as PageEvent);

      expect(navigateSpy).toHaveBeenCalledWith(
        ['.'],
        {
          relativeTo: TestBed.inject(ActivatedRoute),
          queryParams: {
            page: 4,
            perPage: 7,
          },
          queryParamsHandling: 'merge',
          preserveFragment: true,
        }
      );
    });
  });
});
