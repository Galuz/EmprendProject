import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/share-ideas/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

interface Comment {
  id: number;
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
  
  ideas: Array<{ id: number; texto: string; fecha: string; usuario?: string; editing?: boolean }> = [];
  user?: { name: string; comments?: Comment[] };
  newComment = '';
  isAllComments = true;
  currentPage = 1;
  totalPages = 10;
  showPagination = false;

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadUser();
    this.loadComments();
  }

  loadUser(): void {
    this.userService.getUser().subscribe(
      response => {
        this.user = response.data;
        if (this.user && this.user?.comments) {
          this.user.comments = this.user.comments.map(comment => ({
            ...comment,
            texto: comment.body,
            fecha: comment.created_at,
            usuario: comment.user.name
          }));
        }
      },
      error => console.error('Error obteniendo datos del usuario:', error)
    );
  }

  private transformComments(comments: Comment[]): void {
    this.ideas = comments.map(comment => ({
      id: comment.id,
      texto: comment.body,
      fecha: comment.created_at,
      usuario: comment.user.name,
      editing: false
    }));
  }

  loadComments(): void {
    if (this.isAllComments) {
      this.userService.getAllComments(this.currentPage).subscribe(
        response => {
          this.transformComments(response.data);
          this.totalPages = response.meta.last_page;
          this.showPagination = this.totalPages > 1;
        },
        error => console.error('Error obteniendo todos los comentarios:', error)
      );
    } else {
      if (this.user && this.user.comments) {
        this.transformComments(this.user.comments);
        this.showPagination = false;
      }
    }
  }

  updateComments(value: boolean): void {
    this.isAllComments = value;
    this.loadComments();
    console.log('test');
  }

  shareComment(): void {
    if (this.newComment.trim()) {
      console.log('newComment antes de enviar:', this.newComment);
      this.userService.addComment(this.newComment).subscribe(
        comment => {
          console.log('Respuesta del servidor:', comment);
          
          const newCommentData = comment.data ? comment.data : comment; // Verificar si comment contiene data
          
          const newComment = {
            id: newCommentData.id,
            texto: newCommentData.body,
            fecha: newCommentData.created_at
          };
          
          this.ideas.push(newComment);
          
          if (!this.isAllComments && this.user && this.user.comments) {
            this.user.comments.push({
              ...newCommentData,
              user: { name: this.user.name } 
            });
            console.log('comments',this.user.comments);
            this.transformComments(this.user.comments);
          }
  
          this.newComment = '';
          this.loadComments();
        },
        error => console.error('Error añadiendo comentario:', error)
      );
    }
  }
  

  updateComment(idea: any): void {
    if (idea.texto.trim()) {
      this.userService.updateComment(idea.id, idea.texto).subscribe(
        response => {
          console.log('Comentario actualizado:', response);
          
          if (!this.isAllComments && this.user && this.user.comments) {
            const index = this.user.comments.findIndex(comment => comment.id === idea.id);
            if (index > -1) {
              this.user.comments[index] = {
                ...this.user.comments[index],
                body: idea.texto
              };
              this.transformComments(this.user.comments);
            }
          }
          
          idea.editing = false;
        },
        error => console.error('Error actualizando comentario:', error)
      );
    }
  }
  

  editComment(idea: any): void {
    idea.editing = true;
  }

  deleteComment(id: number): void {
    this.userService.deleteComment(id).subscribe(
      () => {
        console.log('Comentario eliminado:', id);
        if (!this.isAllComments && this.user && this.user.comments) {
          this.user.comments = this.user.comments.filter(comment => comment.id !== id);
          this.transformComments(this.user.comments);
        }
        
        this.loadComments();
      },
      error => console.error('Error eliminando comentario:', error)
    );
  }

  previousPage(): void {
    this.changePage(this.currentPage - 1);
  }

  nextPage(): void {
    this.changePage(this.currentPage + 1);
  }

  goToPage(page: number): void {
    this.changePage(page);
  }

  private changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadComments();
    }
  }

  logout(): void {
    this.authService.logout().subscribe(
      () => {
        console.log('Usuario deslogueado exitosamente');
        this.authService.removeToken();
        this.user = undefined;
        this.router.navigate(['/']);
      },
      error => console.error('Error al desloguear el usuario', error)
    );
  }
}
