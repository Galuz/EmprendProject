import { Component } from '@angular/core';

interface CardData {
  image: string;
  title: string;
  description: string;
}

const IMAGE_BASE_PATH = '../../../assets/images/profile-pic/';
const DESCRIPTION = 'Es el Director de Desarrollo de Producto en nuestra startup. Es un apasionado de la tecnología y la innovación, y su experiencia en desarrollo de software es clave para la creación de productos de alta calidad.';

const CARDS_DATA: CardData[] = [
  { image: `${IMAGE_BASE_PATH}profile1.jpg`, title: 'Homero Archundia', description: DESCRIPTION },
  { image: `${IMAGE_BASE_PATH}profile2.jpg`, title: 'Steven Spilberg', description: DESCRIPTION },
  { image: `${IMAGE_BASE_PATH}profile3.jpg`, title: 'Guillo del Toro', description: DESCRIPTION }
];

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent {
  cardsData = CARDS_DATA;
}
