import { Component, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-rating',
  template: `
    <button [disabled]="disabled || isLowestValue" (click)="decrement()">
      -
    </button>
    {{ counterValue }}
    <button [disabled]="disabled || isHighestValue" (click)="increment()">
      +
    </button>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingComponent),
      multi: true,
    },
  ],
})
export class RatingComponent implements ControlValueAccessor {
  @Input()
  disabled = false;

  @Input()
  lowerLimit = 0;

  @Input()
  upperLimit = 5;

  @Input()
  get counterValue() {
    return this._counterValue;
  }

  set counterValue(val) {
    this._counterValue = val;
    this.propagateChange(val);
  }

  get isLowestValue() {
    return this.counterValue === this.lowerLimit;
  }

  get isHighestValue() {
    return this.counterValue === this.upperLimit;
  }

  private _counterValue = 0;

  // Function to call when the rating changes.
  propagateChange: any = () => {};
  // Function to call when the input is touched
  propagateTouched: any = () => {};

  writeValue(value: number): void {
    if (value) {
      this.counterValue = value;
    }
  }
  registerOnChange(fn: (rating: number) => void) {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: () => void) {
    this.propagateTouched = fn;
  }
  // Allows Angular to disable the input.
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  increment() {
    if (this.counterValue < this.upperLimit) {
      this.counterValue++;
      this.propagateTouched();
    }
  }

  decrement() {
    if (this.counterValue > this.lowerLimit) {
      this.counterValue--;
      this.propagateTouched();
    }
  }
}
