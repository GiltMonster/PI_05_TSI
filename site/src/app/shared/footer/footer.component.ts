import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(private router: Router) {}

  navigateToPlanos(): void {
    this.router.navigate(['/planos']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
