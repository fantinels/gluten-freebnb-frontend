import { Component } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  hidePassword = true;
  email: string = '';
  senha: string = '';
  errorMessage: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  listarUsuarios() {
    this.usuarioService.listarUsuarios().subscribe(
      usuarios => {
        console.log("USUARIOS: ", usuarios)
      }
    )
  }

  login(email: string, senha: string) {
    this.usuarioService.login(email, senha).subscribe(
      usuario => {
        if(usuario && senha) {
          if(usuario.senha === senha) {
            sessionStorage.setItem('usuario.nome', usuario.nome);
            sessionStorage.setItem('usuario.id', usuario.id);
            this.router.navigate(['/home'])
              .then( () => {
                window.location.reload()
              });
          } else {
            this.errorMessage = 'Email ou senha incorreto!';
          }
        } else {
          this.errorMessage = 'Faltou digitar a senha!';
        }
      },
      error => {
        this.errorMessage = 'Email ou senha incorreto!';
      }
    )
  }

  // Método para limpar a mensagem de erro
  clearErrorMessage() {
    this.errorMessage = '';
  }

}
