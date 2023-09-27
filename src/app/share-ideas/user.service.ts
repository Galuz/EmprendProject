import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api'; 

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): { headers: HttpHeaders } {
    const token = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  getUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user`, this.getHeaders());
  }

  getUserComments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/comments`, this.getHeaders());
  }

  getCommentById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/comments/${id}`, this.getHeaders());
  }
  
  getAllComments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/comments`, this.getHeaders());
  }
  
  addComment(body: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/comments`, { body }, this.getHeaders());
  }
}
