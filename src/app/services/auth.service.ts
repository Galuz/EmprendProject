import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; 
  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    const url = `${this.apiUrl}/register`;
    return this.http.post(url, userData);
  }

  login(email: string, password: string): Observable<any> {
    const body = { email, password }; 
    return this.http.post(`${this.apiUrl}/login`, body);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('api_token');
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem('api_token');
  }
  
  logout() {
    localStorage.removeItem('api_token');
    localStorage.removeItem('user_name');
  }
}
