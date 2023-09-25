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
      description: 'Es el Director de Desarrollo de Producto en nuestra startup. Es un apasionado de la tecnología y la innovación, y su experiencia en desarrollo de software es clave para la creación de productos de alta calidad.' },
    { image: '../../../assets/images/profile-pic/profile2.jpg', 
      title: 'Steven Spilberg', 
      description: 'Es el Director de Desarrollo de Producto en nuestra startup. Es un apasionado de la tecnología y la innovación, y su experiencia en desarrollo de software es clave para la creación de productos de alta calidad.' },
    { image: '../../../assets/images/profile-pic/profile3.jpg', 
      title: 'Guillo del Toro', 
      description: 'Es el Director de Desarrollo de Producto en nuestra startup. Es un apasionado de la tecnología y la innovación, y su experiencia en desarrollo de software es clave para la creación de productos de alta calidad.' }
  ];
}
