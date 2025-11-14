import { Component } from '@angular/core';

@Component({
  selector: 'app-anexos-pet',
  imports: [],
  templateUrl: './anexos-pet.html',
  styleUrl: './anexos-pet.scss',
  standalone: true,
})
export class AnexosPet {

  activeTab: string = 'documentos';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

}
