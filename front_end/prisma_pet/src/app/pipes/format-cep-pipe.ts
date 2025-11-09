import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCEP',
  standalone: true
})
export class FormatCEPPipe implements PipeTransform {

  transform(cep: string): string {
    return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
  }

}
