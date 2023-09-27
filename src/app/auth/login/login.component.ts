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
  modoRegistro: boolean = false; // Bandera para indicar el modo

  constructor(private authService: AuthService) { }

  toggleModoRegistro() {
    this.modoRegistro = !this.modoRegistro;
  }

  enviar() {
    console.log("simon")
    if (this.modoRegistro) {
      // Lógica para registro
      this.authService.register(this.usuario, this.contrasena).subscribe(
        (response) => {
          // Manejar la respuesta exitosa aquí
          console.log('Registrado con éxito:', response);

          // Aquí puedes, por ejemplo, redirigir al usuario al login o a la página principal
          this.modoRegistro = false; // Cambiar a modo de login
        },
        (error) => {
          // Manejar el error aquí
          console.error('Error durante el registro:', error);
          
          // Puedes mostrar un mensaje de error al usuario, por ejemplo.
        }
      );
    } else {
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
}
