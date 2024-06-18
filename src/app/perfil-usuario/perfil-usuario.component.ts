import { Component } from '@angular/core';
import { AcomodacaoService } from '../acomodacao.service';
import { UsuarioService } from '../usuario.service';

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

  constructor(private acomodacaoService: AcomodacaoService, private usuarioService: UsuarioService) {

    this.acomodacaoService.listarHospedagemPorIdUsuario().subscribe(
      (acomodacao) => {
        this.listaAcomodacoes = acomodacao;
        console.log(acomodacao);
        
      }
    );

    this.usuarioService.usuarioPeloId().subscribe(
      (usuario) => {
        this.user = usuario
        console.log(usuario);
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

  enviarDadosApi() {
    this.usuarioService.editarUsuario(this.user.id, this.user).subscribe(
      (usuario) => {
        this.user = usuario
        localStorage.setItem('usuario.nome', usuario.nome)
        console.log("DADOS ATUALIZADOS: ", usuario);
        this.isDisable = true;
        this.mostrarBotao = false;
      }
    )
  }
}
