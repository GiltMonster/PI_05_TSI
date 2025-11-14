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
