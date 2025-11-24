import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-floating-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floating-buttons.component.html',
  styleUrl: './floating-buttons.component.scss'
})
export class FloatingButtonsComponent {
  whatsappNumber = '551198990829';
  instagramHandle = 'veterinariosja';

  openWhatsApp(): void {
    window.open(`https://wa.me/${this.whatsappNumber}`, '_blank');
  }

  openInstagram(): void {
    window.open(`https://www.instagram.com/${this.instagramHandle}`, '_blank');
  }
}

