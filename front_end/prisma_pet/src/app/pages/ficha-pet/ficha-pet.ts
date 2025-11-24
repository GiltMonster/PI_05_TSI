import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PetService } from '../../services/pet-service';
import { HeaderPet } from "../../components/header-pet/header-pet";
import { FichaPetInterface } from '../../interfaces';
import { Loading } from '../../components/loading/loading';
import { finalize } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { UserTypeProviderService } from '../../shared/user-type-service';

@Component({
  selector: 'app-ficha-pet',
  imports: [CommonModule, MatIconModule, RouterModule, HeaderPet, Loading],
  templateUrl: './ficha-pet.html',
  styleUrl: './ficha-pet.scss',
})
export class FichaPet implements OnInit {

  userId: number;
  pets: FichaPetInterface = { tutor_name: '', pets: [] };
  loading = false;
  typeUser = '';

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private userTypeService: UserTypeProviderService
  ) {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));
  }

  ngOnInit(): void {
    this.getPetDetails()
    this.userTypeService.userType$.subscribe(type => {
      this.typeUser = type;
    });
  }

getPetDetails() {
  this.loading = true;
  this.petService.getPetsByTutorId(this.userId).subscribe({
    next: (res) => {
      this.pets = res;
      console.log('pets:', this.pets);
      this.loading = false;
    },
    error: (err) => {
      console.log(err.error.message);
      this.loading = false;
    }
  });
}


}
