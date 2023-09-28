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
  
  ideas: Array<{ id: number; texto: string; fecha: string; usuario: string; editing?: boolean }> = [];
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

  loadComments(): void {
    if (this.isAllComments) {
      this.userService.getAllComments(this.currentPage).subscribe(
        response => {
          this.ideas = response.data.map((comment: Comment) => ({
            id: comment.id,
            texto: comment.body,
            fecha: comment.created_at,
            usuario: comment.user.name,
            editing: false
          }));
          this.totalPages = response.meta.last_page;
          this.showPagination = this.totalPages > 1;
        },
        error => console.error('Error obteniendo todos los comentarios:', error)
      );
    } else {
      this.ideas = this.user?.comments?.map((comment: Comment) => ({
        id: comment.id,
        texto: comment.body,
        fecha: comment.created_at,
        usuario: comment.user.name,
        editing: false
      })) || [];
      this.showPagination = false;
    }
  }

  updateComments(value: boolean): void {
    this.isAllComments = value;
    this.loadComments();
  }

  shareComment(): void {
    if (this.newComment.trim()) {
      this.userService.addComment(this.newComment).subscribe(
        comment => {
          console.log('Comentario añadido:', comment);
          this.ideas.push({
            id: comment.id,
            texto: comment.body,
            fecha: comment.created_at,
            usuario: comment.user.name,
            editing: false
          });
          this.newComment = '';
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
