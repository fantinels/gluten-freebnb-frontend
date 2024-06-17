import { Component } from '@angular/core';
import { AcomodacaoService } from '../acomodacao.service';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})
export class PerfilUsuarioComponent {

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

}
