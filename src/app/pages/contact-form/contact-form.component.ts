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
    // Aquí puedes implementar la lógica para enviar los datos
  }
}
