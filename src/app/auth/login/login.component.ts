import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  usuario: string = '';
  contrasena: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) { }

  enviar() {
    this.errorMessage = '';
    this.authService.login(this.usuario, this.contrasena).subscribe(
      (response) => {
        console.log('Login exitoso:', response);
      },
      (error) => {
        console.error('Error en el login:', error);
        this.errorMessage = error.error?.message || 'Error durante el inicio de sesión';
      }
    );
  }
}
