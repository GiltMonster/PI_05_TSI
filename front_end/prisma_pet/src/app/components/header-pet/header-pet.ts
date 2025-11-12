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
export class HeaderPet implements OnInit{

  @Input() petsList: FichaPetInterface = { tutor_name: '', pets: [] };
  indexPet: number = 0;

  constructor()
  { }

  ngOnInit(): void {

  }

  onChangeNextPet() {
    if (this.indexPet < this.petsList.pets.length - 1) {
      this.indexPet++;
    }
  }

  onChangePrevPet() {
    if (this.indexPet > 0) {
      this.indexPet--;
    }
  }
}
