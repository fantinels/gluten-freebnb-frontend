import { Component } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  nomeUsuario = '';

  constructor(public usuarioService: UsuarioService, private router: Router) {
    
    this.nomeUsuario = this.usuarioService.getUsuarioNome();
  }
  
   logout() {
    this.usuarioService.logout();
    this.router.navigate(['/home'])
      .then( () => {
        window.location.reload()
      });
  }
}
