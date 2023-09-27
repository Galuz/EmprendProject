import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/share-ideas/user.service';

@Component({
  selector: 'app-share-ideas',
  templateUrl: './share-ideas.component.html',
  styleUrls: ['./share-ideas.component.scss']
})

export class ShareIdeasComponent implements OnInit {
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
  ];
  user: any; 
  newComment: string = '';
  commentFilter: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      response => {
        this.user = response.data;
        console.log('Datos del usuario:', this.user);
      },
      error => console.error('Error obteniendo datos del usuario:', error)
    );

    /* this.userService.getUserComments().subscribe(
      data => {
        console.log('Comentarios del usuario:', data);
      },
      error => console.error('Error obteniendo comentarios del usuario:', error)
    );
    
    this.userService.getAllComments().subscribe(
      data => {
        this.ideas = data;
        console.log('Todos los comentarios:', data);
      },
      error => console.error('Error obteniendo todos los comentarios:', error)
    ); */
  }

  shareComment(): void {
    if (this.newComment) {
      this.userService.addComment(this.newComment).subscribe(
        data => {
          console.log('Comentario añadido:', data);
          this.ideas.push(data);
          this.newComment = '';
        },
        error => console.error('Error añadiendo comentario:', error)
      );
    }
  }
}
