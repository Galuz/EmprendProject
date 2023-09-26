import { Component } from '@angular/core';

@Component({
  selector: 'app-share-ideas',
  templateUrl: './share-ideas.component.html',
  styleUrls: ['./share-ideas.component.scss']
})
export class ShareIdeasComponent {
  ideas = [
    {
      texto: 'Esta es una idea genial',
      fecha: '2023-09-25',
      usuario: 'Usuario 1'
    },
    {
      texto: 'Otra idea interesante',
      fecha: '2023-09-24',
      usuario: 'Usuario 2'
    },
    // Agrega más ideas aquí
  ];
}
