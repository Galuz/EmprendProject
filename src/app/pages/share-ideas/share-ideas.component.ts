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
  currentPage: number = 1;
  totalPages = 10;
  paginationLinks: any;
  showPagination: boolean = false;
  userComments: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUser(); 
    this.loadComments();
  }

  loadUser(): void {
    this.userService.getUser().subscribe(
      response => {
        console.log('User data',response)
        this.user = response.data;
        // Almacena los comentarios del usuario en la variable userComments
        if (response.data && Array.isArray(response.data.comments)) {
          this.userComments = response.data.comments.map((comment: Comment) => ({
            texto: comment.body,
            fecha: comment.created_at,
            usuario: comment.user.name
          }));
        }
      },
      error => console.error('Error obteniendo datos del usuario:', error)
    );
  }

  loadPage(page: number): void {
    this.currentPage = page;
    this.loadComments();
  }

  loadComments(): void {
    if (this.isAllComments) {
      this.userService.getAllComments(this.currentPage).subscribe(
        response => {
          console.log(response)
          this.ideas = response.data.map((comment: Comment) => ({
            texto: comment.body,
            fecha: comment.created_at,
            usuario: comment.user.name
          }));
          this.totalPages = response.meta.last_page;
          this.paginationLinks = response.links;
          this.showPagination = true;
        },
        error => console.error('Error obteniendo todos los comentarios:', error)
      );
    } else {
      this.ideas = [...this.userComments];
      this.showPagination = false;
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

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadComments();
    }
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadComments();
    }
  }
  
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadComments();
    }
  }
}
