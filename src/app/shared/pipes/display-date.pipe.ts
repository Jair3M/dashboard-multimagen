import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayDate',
})
export class DisplayDatePipe implements PipeTransform {
  transform(value: Date | null): string {
    if (!value) return '';
    const day = String(value.getDate()).padStart(2, '0');
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const year = value.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
