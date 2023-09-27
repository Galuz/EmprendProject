import { Component } from '@angular/core';

@Component({
  selector: 'app-share-ideas',
  templateUrl: './share-ideas.component.html',
  styleUrls: ['./share-ideas.component.scss']
})
export class ShareIdeasComponent {
  ideas = [
    {
      texto: 'Mi idea es una “Camara Verrgud’, te la pegas en la cara y puedes estar grabando todo sin que tengas que estar agarrando un teléfono, cdmara, etc. Seria ideal para los      conciertos y/ o eventos publicos asi puedes disfrutar del concierto y estar grabando      sin tener que estar con tu teléfono todo el tiempo. Si no también podria servir para espionaje.',
      fecha: '2023-09-25',
      usuario: 'Usuario 1'
    },
    {
      texto: 'Para todos los que no tenemos tiempo la idea es sacar comida en pasta. Si, como si fuera pasta de dientes pero que sean distintos alimentos, por ejemplo pozole, enchiladas, un corte de carne, hamburguesa. Se moleria todo y luego se haria como pasta. Asi puedes estar trabajando o haciendo otra cosa y disfrutando de tu rica comida.',
      fecha: '2023-09-24',
      usuario: 'Usuario 2'
    },
    // Agrega más ideas aquí
  ];
}
