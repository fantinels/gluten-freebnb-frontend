import { Component, Input, OnInit } from '@angular/core';
import { AcomodacaoService } from '../acomodacao.service';

@Component({
  selector: 'app-lista-acomodacoes',
  templateUrl: './lista-acomodacoes.component.html',
  styleUrl: './lista-acomodacoes.component.css'
})

export class ListaAcomodacoesComponent {

  listaAcomodacoes: any[] = [];

  constructor(private acomodacaoService: AcomodacaoService) {
    // this.listaAcomodacoes = this.acomodacaoService.listar();
    
    this.acomodacaoService.listar().subscribe(
      (acomodacao) => {
        this.listaAcomodacoes = acomodacao;
        // console.log(this.listaAcomodacoes)
        // console.log(acomodacao[3].foto)
      }
    );
  } 
  
}
