import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCPF',
  standalone: true
})
export class FormatCPFPipe implements PipeTransform {

  transform(cpf = ''): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

}
