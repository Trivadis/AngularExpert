import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-rating',
  template: `
    <button [disabled]="disabled" (click)="decrement()">-</button>
    {{ counterValue }}
    <button [disabled]="disabled" (click)="increment()">+</button>
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

  private _counterValue = 0;
  @Input()
  get counterValue() {
    return this._counterValue;
  }
  set counterValue(val) {
    this._counterValue = val;
    this.propagateChange(val);
  }

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
    this.counterValue++;
    this.propagateTouched();
  }

  decrement() {
    this.counterValue--;
    this.propagateTouched();
  }
}
