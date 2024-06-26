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

  editarUsuario() {
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
    if(confirm("Tem certeza que deseja excluir seu perfil?")) {
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

  excluirHospedagem(id: any): void {
    if(confirm("Tem certeza que deseja excluir esta hospedagem?")) {
      this.acomodacaoService.excluirHospedagem(id).subscribe(
        (hospedagem) => {
          console.log("Hosp. Excluída: ", hospedagem);
          this.router.navigate(['/perfil'])
          .then( () => {
            window.location.reload();
          })
        }
      )
    }
  }

  editarHospedagem(id: any): void {
    this.router.navigate([`hospedagem/${id}/editar`])
  }

}
