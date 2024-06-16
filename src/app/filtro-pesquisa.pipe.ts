import { Pipe, PipeTransform } from '@angular/core';
import { Acomodacao } from './acomodacao';

@Pipe({
  name: 'filtroPesquisa',
  pure: false
})
export class FiltroPesquisaPipe implements PipeTransform {

  // transform(litsaAcomodacoes: Acomodacao[], nomePesq: string): Acomodacao[] {
  //   return litsaAcomodacoes.filter ( (acomodacao:Acomodacao) => {
  //     return acomodacao.cidade?.toLowerCase().includes(nomePesq.toLowerCase())
  //   } )
  // }

  transform(listaAcomodacoes: Acomodacao[], termoPesquisa: string): Acomodacao[] {
    if (!termoPesquisa) {
      return listaAcomodacoes;
    }

    termoPesquisa = termoPesquisa.toLowerCase();

    return listaAcomodacoes.filter((acomodacao: Acomodacao) => {
      return acomodacao.nome?.toLowerCase().includes(termoPesquisa) || 
             acomodacao.cidade?.toLowerCase().includes(termoPesquisa);
    });
  }

}
