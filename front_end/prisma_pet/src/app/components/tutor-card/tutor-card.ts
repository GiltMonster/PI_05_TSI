import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { UserInterface } from '../../interfaces';
import { UsuarioService } from '../../services/usuario-service';
import { FormatPhonePipe } from '../../pipes/format-phone-pipe';

@Component({
  selector: 'app-tutor-card',
  imports: [CommonModule, MatIconModule, FormatPhonePipe],
  standalone: true,
  templateUrl: './tutor-card.html',
  styleUrls: ['./tutor-card.scss']
})
export class TutorCard implements OnInit {

  @Input() userTutor!: UserInterface;
  @Input() typeUser: string = '';
  @Output() tutorDeleted = new EventEmitter<number>();

  constructor(
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.typeUser
  }

  findUserById(id: number) {
  }

  deleteTutor(tutorId: number) {
    this.usuarioService.deleteAccount(tutorId).subscribe({
      next: (res) => {
        console.log(res);
        this.tutorDeleted.emit(tutorId);
      },
      error: (err) => {
        console.log("erro ao deletar tutor:", err);
      }
    });
  }

  editTutor(tutorId: number) { }


}
