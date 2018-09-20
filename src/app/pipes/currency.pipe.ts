import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amountConverter'
})
export class AmountConverterPipe implements PipeTransform {

  transform(value: any | string, locale?: string): string {
     return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&'");
  }

}
