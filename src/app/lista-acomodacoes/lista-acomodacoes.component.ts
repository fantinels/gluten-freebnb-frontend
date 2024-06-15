import { Component } from '@angular/core';
import { AcomodacaoService } from '../acomodacao.service';

@Component({
  selector: 'app-lista-acomodacoes',
  templateUrl: './lista-acomodacoes.component.html',
  styleUrl: './lista-acomodacoes.component.css'
})

export class ListaAcomodacoesComponent {

  listaAcomodacoes: any[] = [];
  nomePesquisado = "";

  constructor(private acomodacaoService: AcomodacaoService) {
    
    this.acomodacaoService.listar().subscribe(
      (acomodacao) => {
        this.listaAcomodacoes = acomodacao;
      }
    );
  } 
  
}
