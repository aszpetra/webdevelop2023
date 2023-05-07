import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    let tzoffset = (new Date(value)).getTimezoneOffset() * 6000;
    let minOffset = new Date(value).getTime() - tzoffset;
    let localISOTime = (new Date(minOffset)).toLocaleDateString().replace('Z', '').replace('T', '');
    return localISOTime;
  }

}
