import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  userName: string | null = null;

  constructor(private authService: AuthService) { }
  
  ngOnInit() {
    this.userName = localStorage.getItem('user_name');
  }

  logout() {
    this.authService.logout();
    this.userName = null;
  }

}
