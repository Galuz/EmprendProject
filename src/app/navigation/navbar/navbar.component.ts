import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  userName: string | null = null;
  
  ngOnInit() {
    this.userName = localStorage.getItem('user_name'); // Obtener el nombre
  }
}
