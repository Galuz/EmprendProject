import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  cardsData = [
    { image: '../../../assets/images/profile-pic/profile1.jpg', 
      title: 'Homero Archundia', 
      description: 'Homero es la Cofundadora y Directora de Marketing de nuestra startup. Con una pasión por la estrategia digital, Ana lidera nuestro equipo de marketing y relaciones públicas.' },
    { image: '../../../assets/images/profile-pic/profile2.jpg', 
      title: 'Steven Spilberg', 
      description: 'Steven es el Director de Desarrollo de Producto en nuestra startup. Es un apasionado de la tecnología y la innovación, y su experiencia en desarrollo de software es clave para la creación de productos de alta calidad.' },
    { image: '../../../assets/images/profile-pic/profile3.jpg', 
      title: 'Guillo del Toro', 
      description: 'Guillo es la Gerente de Recursos Humanos en nuestra startup. Su enfoque en el desarrollo de talento y la cultura empresarial ha contribuido a mantener un ambiente de trabajo positivo y productivo.' }
  ];
}
