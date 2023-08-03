import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appAbbr',
})
export class AbbrPipe implements PipeTransform {
  transform(value: string): string | null {
    if (typeof value !== 'string') {
      throw new Error('Value is not a string');
    }
    if (value.length === 0) {
      return null;
    }
    const parts = value.split(' ');
    let abbr = '';
    parts.forEach((p) => (abbr += p[0]));

    return abbr;
  }
}
