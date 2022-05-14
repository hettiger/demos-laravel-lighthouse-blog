import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

import { SPINNER_HEIGHT_RATIO, SpinningButtonLabelComponent } from './spinning-button-label.component';

@Component({
  template: `<app-spinning-button-label [isSpinning]="isSpinning">Fake Content</app-spinning-button-label>`,
})
class TestComponent {
  isSpinning = false;
}

describe('SpinningButtonLabelComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugEl: DebugElement;
  let label: HTMLSpanElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestComponent, SpinningButtonLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugEl = fixture.debugElement;
    label = debugEl.query(By.css('.spinning-button-label')).nativeElement as HTMLSpanElement;
  });

  const whenSpinning = (isSpinning = true) => {
    component.isSpinning = isSpinning;
    fixture.detectChanges();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('label', () => {
    const assertLabelIsHidden = (isHidden = true) => {
      expect(label.classList.contains('spinning-button-label--hidden')).toBe(isHidden);
    }

    it('should render the provided content', () => {
      expect(label.textContent).toBe('Fake Content');
    });

    it('should be hidden when spinning', () => {
      whenSpinning();

      assertLabelIsHidden();
    });

    it('should not be hidden when not spinning', () => {
      whenSpinning(false);

      assertLabelIsHidden(false);
    });
  });

  describe('spinner', () => {
    const spinner = (): undefined | MatProgressSpinner => {
      return debugEl.query(By.directive(MatProgressSpinner))?.componentInstance;
    }

    const assertSpinnerExists = (isExisting = true) => {
      if (isExisting) {
        expect(spinner()).toBeInstanceOf(MatProgressSpinner)
      } else {
        expect(spinner()).toBeUndefined();
      }
    }

    it('should render a spinner when spinning', () => {
      whenSpinning();

      assertSpinnerExists();
    });

    it('should not render a spinner when not spinning', () => {
      whenSpinning(false);

      assertSpinnerExists(false);
    });

    it('should configure the rendered spinner properly when spinning', () => {
      whenSpinning();
      const spinningButtonLabel = debugEl.query(By.directive(SpinningButtonLabelComponent)).nativeElement;
      const expectedHeight = spinningButtonLabel.offsetHeight * SPINNER_HEIGHT_RATIO;

      expect(spinner()?.diameter).toBe(expectedHeight)
      expect(spinner()?.mode).toBe('indeterminate');
    });
  });
});
