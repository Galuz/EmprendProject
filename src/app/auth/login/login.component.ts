import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  usuario: string = '';
  contrasena: string = '';

  enviar() {
    console.log('Usuario:', this.usuario);
    console.log('Contraseña:', this.contrasena);
  }
}
