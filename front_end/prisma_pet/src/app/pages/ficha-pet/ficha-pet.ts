import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PetService } from '../../services/pet-service';
import { HeaderPet } from "../../components/header-pet/header-pet";
import { FichaPetInterface, PetInterface } from '../../interfaces';

@Component({
  selector: 'app-ficha-pet',
  imports: [RouterModule, HeaderPet],
  templateUrl: './ficha-pet.html',
  styleUrl: './ficha-pet.scss',
})
export class FichaPet implements OnInit {

  userId: number;
  pets: FichaPetInterface = { tutor_name: '', pets: [] };

  constructor(
    private route: ActivatedRoute,
    private petService: PetService
  ) {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));

  }

  ngOnInit(): void {
    this.getPetDetails();
  }

  getPetDetails() {
    this.petService.getPetsByTutorId(this.userId).subscribe({
      next: (res) => {
        this.pets = res;
        console.log('pets:', this.pets);

      },
      error: (err) => {
        console.log(err.error.message);
      }
    });
  }


}
