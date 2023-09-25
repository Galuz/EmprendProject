import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  cardsData = [
    { title: 'Título 1', description: 'Descripción 1' },
    { title: 'Título 2', description: 'Descripción 2' },
    { title: 'Título 3', description: 'Descripción 3' }
  ];
}
