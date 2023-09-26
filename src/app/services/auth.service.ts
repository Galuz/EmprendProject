import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'URL_DEL_BACKEND_API'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }

  login(usuario: string, contrasena: string): Observable<any> {
    const body = { usuario, contrasena };
    return this.http.post(`${this.apiUrl}/login`, body);
  }
}
