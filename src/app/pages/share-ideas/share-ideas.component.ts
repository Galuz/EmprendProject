import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/share-ideas/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Comment, UserDataResponse } from 'src/app/interfaces/share-data';

@Component({
  selector: 'app-share-ideas',
  templateUrl: './share-ideas.component.html',
  styleUrls: ['./share-ideas.component.scss']
})
export class ShareIdeasComponent {
  ideas :Comment[] = [];
  allComments: Comment[] = [];
  userData: UserDataResponse | null = null;
  isEditing = false; // Nueva variable para controlar si se está editando
  editingValue = '';
  newComment = '';
  
  constructor(private userService: UserService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadUserData();
    this.loadAllComments();
  }

  loadUserData(){
    this.userService.getUser().subscribe(
      response => {
        console.log(response)
        this.userData = response.data;
      }
    );
  }

  loadAllComments() {
    this.userService.getAllComments().subscribe(
      response => {
        console.log('all',response);
        this.allComments = response.data;
        this.ideas  = response.data; 
      }
    );
  }

  filterMyComments() {
    if (this.userData) {
        this.ideas  = this.allComments.filter(comment => comment.user.id === this.userData?.id);
    }
  }

  showAllComments() {
    this.ideas  = this.allComments;
  }

  addComment() {
    if (this.newComment.trim()) {
      this.userService.addComment(this.newComment).subscribe(
        () => {
          this.newComment = '';
          this.loadAllComments();
        },
        error => {
          console.error('Error adding comment', error);
        }
      );
    } else {
      alert('El comentario no puede estar vacío');
    }
  }
}
