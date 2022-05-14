import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

export const SPINNER_HEIGHT_RATIO = 9 / 16;

@Component({
  selector: 'app-spinning-button-label',
  templateUrl: './spinning-button-label.component.html',
  styleUrls: ['./spinning-button-label.component.scss']
})
export class SpinningButtonLabelComponent implements OnInit, OnChanges {

  @Input() isSpinning = false;

  @ViewChild('container', { static: true, read: ViewContainerRef })
  private viewContainerRef?: ViewContainerRef;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['isSpinning']) { return; }
    if (changes['isSpinning'].previousValue === changes['isSpinning'].currentValue) { return; }

    this.viewContainerRef?.clear();

    if (this.isSpinning && this.viewContainerRef) {
      const spinner = this.viewContainerRef.createComponent(MatProgressSpinner);
      spinner.instance.diameter = this.elementRef.nativeElement.offsetHeight * SPINNER_HEIGHT_RATIO;
      spinner.instance.mode = 'indeterminate';
    }
  }

}
