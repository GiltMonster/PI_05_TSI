import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PetService } from '../../services/pet-service';

@Component({
  selector: 'app-ficha-pet',
  imports: [RouterModule],
  templateUrl: './ficha-pet.html',
  styleUrl: './ficha-pet.scss',
})
export class FichaPet implements OnInit {

  userId: number;

  constructor(
    private route: ActivatedRoute,
    private petService: PetService
  ) {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));
    console.log(this.userId);
  }

  ngOnInit(): void {
    this.getPetDetails();
  }

  getPetDetails() {
    this.petService.getPetsByTutorId(this.userId).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err.error.message);
      }
    });
  }


}
