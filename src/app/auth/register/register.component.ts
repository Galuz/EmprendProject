import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user: string = '';
  email: string = '';
  password: string = '';
  password2: string = '';
  errorMessage: string = ''; 

  constructor(private authService: AuthService, private router: Router) {}

  enviar() {
    this.errorMessage = ''; 

    if (this.password !== this.password2) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    const userData = {
      name: this.user,
      email: this.email,
      password: this.password,
      password_confirmation: this.password2
    };

    this.authService.register(userData).subscribe(
      (response) => {
        localStorage.setItem('api_token', response.data.api_token);
        this.router.navigate(['/share']);
      },
      (error) => {
        console.error('Error registrando usuario', error);
        this.errorMessage = error.error?.message || 'Error registrando usuario'; 
      }
    );
  }
}
