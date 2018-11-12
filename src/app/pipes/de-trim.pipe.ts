import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'detrim'

})
export class DeTrimPipe implements PipeTransform {
  public transform(value: string, args?: any) {
    if (!value) {
      return null;
    }
    return value.replace(/-/g, ' ');
  }
}
