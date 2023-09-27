import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api'; 

  constructor(private http: HttpClient) { }

  getUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user`);
  }

  getUserComments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/comments`);
  }
  
  getAllComments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/comments`);
  }
  
  addComment(body: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/comments`, { body });
  }
}
