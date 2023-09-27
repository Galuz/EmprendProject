import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/share-ideas/user.service';

interface Comment {
  body: string;
  created_at: string;
  user: {
    name: string;
  };
}

@Component({
  selector: 'app-share-ideas',
  templateUrl: './share-ideas.component.html',
  styleUrls: ['./share-ideas.component.scss']
})


export class ShareIdeasComponent implements OnInit {
  
  ideas = [
    {
      texto: '',
      fecha: '',
      usuario: ''
    },
  ];
  user: any; 
  newComment: string = '';
  isAllComments: boolean = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      response => {
        this.user = response.data;
        if (this.user && Array.isArray(this.user.comments)) {
          this.ideas = this.user.comments.map((comment: Comment) => {
            return {
              texto: comment.body,
              fecha: comment.created_at,
              usuario: comment.user.name
            };
          });
          console.log('Ideas:', this.ideas);
        }
      },
      error => console.error('Error obteniendo datos del usuario:', error)
    );

    /* this.userService.getCommentById(this.user.id).subscribe(
      data => {
        console.log('Comentario obtenido:', data);
      },
      error => console.error('Error obteniendo el comentario:', error)
    ); */


    /* this.userService.getUserComments().subscribe(
      data => {
        console.log('Comentarios del usuario:', data);
      },
      error => console.error('Error obteniendo comentarios del usuario:', error)
    ); */
    
    
    /* this.userService.getAllComments().subscribe(
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
