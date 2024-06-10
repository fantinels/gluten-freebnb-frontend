import { Pipe, PipeTransform } from '@angular/core';
import { Acomodacao } from './acomodacao';

@Pipe({
  name: 'filtroPesquisa',
  pure: false
})
export class FiltroPesquisaPipe implements PipeTransform {

  transform(litsaAcomodacoes: Acomodacao[], nomePesq: string): Acomodacao[] {
    return litsaAcomodacoes.filter ( (acomodacao:Acomodacao) => {
      return acomodacao.nome?.toLowerCase().includes(nomePesq.toLowerCase())
    } )
  }

}
