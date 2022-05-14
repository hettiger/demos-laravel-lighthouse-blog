import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { NavigationHistoryService } from './navigation-history.service';
import { Component } from '@angular/core';

@Component({
  template: ''
})
class TestComponent {}

describe('NavigationHistoryService', () => {
  let service: NavigationHistoryService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'test-a', component: TestComponent },
          { path: 'test-b', component: TestComponent },
          { path: 'test-c', component: TestComponent },
        ]),
      ]
    });
    service = TestBed.inject(NavigationHistoryService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('history', () => {
    it('should initialize to an empty array', () => {
      expect(service.history).toEqual([]);
    });

    it('should return one URL after a navigation took place', async () => {
      await router.navigate(['test-a']);

      expect(service.history).toEqual(['/test-a']);
    });

    it("returns all URL's that we've navigated to", async () => {
      await router.navigate(['test-a']);
      await router.navigate(['test-b']);
      await router.navigate(['test-c']);

      expect(service.history).toEqual([
        '/test-a',
        '/test-b',
        '/test-c',
      ]);
    });
  });
});
