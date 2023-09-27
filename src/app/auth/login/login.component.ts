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

  constructor(private authService: AuthService) { }

  enviar() {
    console.log("simon inicio de sesion")
    // Lógica para inicio de sesión
    this.authService.login(this.usuario, this.contrasena).subscribe(
      (response) => {
        // Manejar la respuesta exitosa aquí
        console.log('Respuesta del servidor:', response);

        // Redirigir al usuario o realizar otras acciones necesarias después del inicio de sesión exitoso.
      },
      (error) => {
        // Manejar el error aquí
        console.error('Error:', error);

        // Puedes mostrar un mensaje de error al usuario, por ejemplo.
      }
    );
  }
}
