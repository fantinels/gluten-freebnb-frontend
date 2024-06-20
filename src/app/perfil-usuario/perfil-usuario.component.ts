import { Component } from '@angular/core';
import { AcomodacaoService } from '../acomodacao.service';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})
export class PerfilUsuarioComponent {

  mostrarBotao = false;
  todosHabilitados = true;


  hidePassword = true;

  isDisable = true;
  
  listaAcomodacoes: any[] = [];

  user: any = '';

  constructor(private acomodacaoService: AcomodacaoService, private usuarioService: UsuarioService, private router: Router) {

    this.acomodacaoService.listarHospedagemPorIdUsuario().subscribe(
      (acomodacao) => {
        this.listaAcomodacoes = acomodacao;
        console.log("Hospedagens: ", acomodacao);
      }
    );

    this.usuarioService.usuarioPeloId().subscribe(
      (usuario) => {
        this.user = usuario
        console.log("Usuário", usuario);
      }
    );
  }

  habilitarInputs(): void {
    this.isDisable = false

    const inputs = document.querySelectorAll('input');
    
    inputs.forEach( (input) => {
      if(!input.disabled) {
        this.todosHabilitados = false;
      }
    });    
    this.mostrarBotao = this.todosHabilitados;
  }

  desabilitarInputs(): void {
    this.isDisable = true;
    this.mostrarBotao = false;
  }

  enviarDadosApi() {
    this.usuarioService.editarUsuario(this.user.id, this.user).subscribe(
      (usuario) => {
        this.user = usuario
        sessionStorage.setItem('usuario.nome', usuario.nome);
        this.isDisable = true;
        this.mostrarBotao = false;
        this.router.navigate(['/perfil'])
          .then( () => {
            window.location.reload()
      });
      }
    )
  }

  excluirPerfil(): void {
    this.usuarioService.excluirPerfil(this.usuarioService.getUsuarioId()).subscribe(
      (usuario) => {
        sessionStorage.removeItem('usuario.nome');
        sessionStorage.removeItem('usuario.id');
        this.router.navigate(['/home'])
          .then( () => {
            window.location.reload();
          })
      }
    )
  }


}
