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
    this.loadComments();
  }

  loadComments(): void {
    if (this.isAllComments) {
      this.userService.getAllComments().subscribe(
        response => {
          // Asumiendo que los comentarios están dentro de response.data
          this.ideas = response.data.map((comment: Comment) => ({
            texto: comment.body,
            fecha: comment.created_at,
            usuario: comment.user.name
          }));
        },
        error => console.error('Error obteniendo todos los comentarios:', error)
      );
    } else {
      this.userService.getUser().subscribe(
        response => {
          this.user = response.data;
          if (this.user && Array.isArray(this.user.comments)) {
            this.ideas = this.user.comments.map((comment: Comment) => ({
              texto: comment.body,
              fecha: comment.created_at,
              usuario: comment.user.name
            }));
          }
        },
        error => console.error('Error obteniendo datos del usuario:', error)
      );
    }
  }

  updateComments(value: boolean): void {
    this.isAllComments = value;
    this.loadComments();
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
