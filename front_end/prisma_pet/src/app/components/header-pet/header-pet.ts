import { Component, Input, OnInit } from '@angular/core';
import { FichaPetInterface, PetInterface } from '../../interfaces';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-header-pet',
  imports: [DatePipe],
  templateUrl: './header-pet.html',
  styleUrl: './header-pet.scss',
  standalone: true,
})
export class HeaderPet implements OnInit {

  @Input() petsList: FichaPetInterface = { tutor_name: '', pets: [] };
  indexPet: number = 0;

  class_btn_next: string = 'btn btn--primary';
  class_btn_prev: string = 'btn btn--primary';

  constructor() { }

  ngOnInit(): void {

  }

  calcIdadePet(data_nascimento?: Date): string | number {
    if (data_nascimento) {
      const nascimento = new Date(data_nascimento);
      const hoje = new Date();
      let idade = hoje.getFullYear() - nascimento.getFullYear();
      const mes = hoje.getMonth() - nascimento.getMonth();

      if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
      }

      return idade;
    }
    return '';
  }

  btnNextDisabled(): boolean {
    return this.indexPet >= this.petsList.pets.length - 1;
  }

  btnPrevDisabled(): boolean {
    return this.indexPet <= 0;
  }

  getNextBtnClass(): string {
    return this.btnNextDisabled() ? 'btn btn--disabled' : 'btn btn--primary';
  }

  getPrevBtnClass(): string {
    return this.btnPrevDisabled() ? 'btn btn--disabled' : 'btn btn--primary';
  }

  onChangeNextPet() {
    if (!this.btnNextDisabled()) {
      this.indexPet++;
    }
  }

  onChangePrevPet() {
    if (!this.btnPrevDisabled()) {
      this.indexPet--;
    }
  }
}
