import { Component, Input, OnInit } from '@angular/core';
import { FichaPetInterface, PetInterface } from '../../interfaces';
import { DatePipe } from '@angular/common';
import { AnexosPet } from '../anexos-pet/anexos-pet';

@Component({
  selector: 'app-header-pet',
  imports: [DatePipe, AnexosPet],
  templateUrl: './header-pet.html',
  styleUrl: './header-pet.scss',
  standalone: true,
})
export class HeaderPet implements OnInit {
  @Input() petsList: FichaPetInterface = {
    tutor_name: '',
    pets: [
      {
        id: 0,
        nome: '',
        tutor: '',
        consultas: [],
        vacinas: [],
      },
    ],
  };
  indexPet: number = 0;
  @Input() typeUser: string = '';

  class_btn_next: string = 'btn btn--primary';
  class_btn_prev: string = 'btn btn--primary';

  constructor() {}

  ngOnInit(): void {}

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

  isFemale(sexo: any): boolean {
    return sexo === true || sexo === 'true' || sexo === 1 || sexo === '1';
  }

  isCastrado(castrado: any): boolean {
    return castrado === true || castrado === 'true' || castrado === 1 || castrado === '1';
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

  private norm(t?: string): string {
    return (t ?? '') // se vier undefined/null, vira string vazia
      .toLowerCase() // tudo minúsculo
      .normalize('NFD') // separa letras dos acentos
      .replace(/\p{Diacritic}/gu, '') // remove os acentos via regex
      .trim(); // tira espaços no início/fim
  }

  getEspeciesIcon(): string {
    const especie = this.norm(this.petsList.pets[this.indexPet].especie);

    if (especie === 'cachorro' || especie === 'cao' || especie === 'canino') {
      return 'assets/imagens/cachorro.png';
    }

    if (especie === 'gato' || especie === 'felino') {
      return 'assets/imagens/gato.png';
    }
    return 'assets/imagens/pet-generico.png';
  }
}
