import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user: string = '';
  email: string = '';
  password: string = '';
  password2: string = '';
  errorMessage: string = ''; 

  constructor(private authService: AuthService) {}

  enviar() {
    this.errorMessage = ''; // Resetear el mensaje de error antes de cada intento de registro

    if (this.password !== this.password2) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    const userData = {
      name: this.user,
      email: this.email,
      password: this.password,
      password_confirmation: this.password2
    };

    this.authService.register(userData).subscribe(
      (response) => {
        console.log('Usuario registrado con éxito', response);
        // Aquí podrías redirigir al usuario o hacer otras acciones necesarias.
      },
      (error) => {
        console.error('Error registrando usuario', error);
        // Si hay un mensaje de error en la respuesta de la API, úsalo, de lo contrario, usa un mensaje de error genérico
        this.errorMessage = error.error?.message || 'Error registrando usuario'; 
      }
    );
  }
}
