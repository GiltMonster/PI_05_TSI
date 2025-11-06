import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthLogin } from './services/auth-login';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  constructor(
    private authService: AuthLogin,
    private router: Router
  ) { }

  protected readonly title = signal('prisma_pet');

  ngOnInit(): void {
    this.verifyAuthToken();
  }

  verifyAuthToken() {
    this.authService.verifyToken().subscribe(
      (res) => {
        // console.log('logado');
      }
    );
  }

}
