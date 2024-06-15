import { Component } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(public usuarioService: UsuarioService, private router: Router) {}

  logout() {
    this.router.navigate(['/'])
  }

  loggedInUser: string | null = null;
  
}
