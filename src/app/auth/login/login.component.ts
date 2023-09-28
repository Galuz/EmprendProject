import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  usuario: string = '';
  contrasena: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  enviar() {
    this.errorMessage = '';
    this.authService.login(this.usuario, this.contrasena).subscribe(
      (response) => {
        if(response.data && response.data.api_token) {
          localStorage.setItem('api_token', response.data.api_token);
          localStorage.setItem('user_name', response.data.name);
          this.router.navigate(['/share']);
        }
      },
      (error) => {
        console.error('Error en el login:', error);
        this.errorMessage = error.error?.message || 'Error durante el inicio de sesión';
      }
    );
  }
}
