import { BackButtonDirective } from './back-button.directive';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { NavigationHistoryService } from '../../services/navigation-history.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { By } from '@angular/platform-browser';

@Component({
  template: `<button appBackButton></button>`,
})
class TestComponent { }

describe('BackButtonDirective', () => {
  let navigationHistoryService: NavigationHistoryService;
  let location: Location;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        BackButtonDirective,
      ],
      imports: [
        RouterTestingModule,
      ],
    }).compileComponents();

    navigationHistoryService = TestBed.inject(NavigationHistoryService);
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
  });

  const createComponent = () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.directive(BackButtonDirective));
    return { fixture, button };
  }

  it('should navigate back using Location.back() when history is available', () => {
    const { button } = createComponent();
    const locationSpy = spyOn(location, 'back');
    spyOnProperty(navigationHistoryService, 'history').and.returnValue([
      'https://…',
      'https://…',
    ]);

    button.nativeElement.click();

    expect(locationSpy).toHaveBeenCalledOnceWith();
  });

  it('should fall back to Router.navigate() when history is missing', () => {
    const { button } = createComponent();
    const routerSpy = spyOn(router, 'navigate');
    spyOnProperty(navigationHistoryService, 'history').and.returnValue([
      'https://…',
    ]);

    button.nativeElement.click();

    expect(routerSpy).toHaveBeenCalledOnceWith(
      ['..'],
      { relativeTo: TestBed.inject(ActivatedRoute)},
    );
  });
});
