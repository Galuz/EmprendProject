import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  nombre: string = '';
  correo: string = '';
  telefono: string = '';
  fecha: string = '';
  mensaje: string = '';

  enviarDatos() {
    // Crea el cuerpo del correo con los datos del formulario
    const cuerpoCorreo = `Nombre: ${this.nombre}%0D%0A`
      + `Correo Electrónico: ${this.correo}%0D%0A`
      + `Teléfono: ${this.telefono}%0D%0A`
      + `Fecha: ${this.fecha}%0D%0A`
      + `Mensaje: ${this.mensaje}`;

    // Abre el cliente de correo del usuario con los datos prellenados
    window.location.href = `mailto:german.glz01@gmail.com?subject=Consulta&body=${cuerpoCorreo}`;

    // Limpia los campos del formulario
    this.nombre = '';
    this.correo = '';
    this.telefono = '';
    this.fecha = '';
    this.mensaje = '';
  }
}
