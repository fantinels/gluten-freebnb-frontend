import { Component } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
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
            const userId = usuario.id;
            console.log("LOGADO: ", usuario, usuario.senha);
            this.usuarioService.setLoggedInUser(usuario.nome);
          } else {
            this.errorMessage = 'Email ou senha incorreto!';
          }
        } else {
          this.errorMessage = 'Faltou digitar a senha!';
        }
      }
    )
  }

  // Método para limpar a mensagem de erro
  clearErrorMessage() {
    this.errorMessage = '';
  }

}
