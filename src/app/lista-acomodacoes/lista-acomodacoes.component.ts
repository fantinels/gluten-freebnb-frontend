import { Component, Input } from '@angular/core';
import { AcomodacaoService } from '../acomodacao.service';

@Component({
  selector: 'app-lista-acomodacoes',
  templateUrl: './lista-acomodacoes.component.html',
  styleUrl: './lista-acomodacoes.component.css'
})
export class ListaAcomodacoesComponent {

  listaAcomodacoes: any[] = [];

  constructor(private acomodacaoService: AcomodacaoService) {
    this.listaAcomodacoes = this.acomodacaoService.listar();
  }

}
