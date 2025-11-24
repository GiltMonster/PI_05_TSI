import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-quem-somos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './quem-somos.component.html',
  styleUrl: './quem-somos.component.scss'
})
export class QuemSomosComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navigateToPlanos(): void {
    this.router.navigate(['/planos']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  navigateToPrismapet(): void {
    this.router.navigate(['/prismapet']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  navigateToContato(): void {
    this.router.navigate(['/contato']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
