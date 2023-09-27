import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; 
  constructor(private http: HttpClient) { }

  register(usuario: string, contrasena: string): Observable<any> {
    const body = { usuario, contrasena };
    return this.http.post(`${this.apiUrl}/register`, body);
  }

  login(usuario: string, contrasena: string): Observable<any> {
    const body = { usuario, contrasena };
    return this.http.post(`${this.apiUrl}/login`, body);
  }
}
