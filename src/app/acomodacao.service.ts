import { Injectable } from '@angular/core';
import { Acomodacao } from './acomodacao';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// const BASE_API = "http://localhost:4200/home";

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json',
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class AcomodacaoService {

  // parâmetro do constructor: private http: HttpClient
  constructor() { }

  listaAcomodacoes: Acomodacao[] = [
    { id: 1, nome: "Porto Alegre, RS", especificacao: "Vista para o Guaíba", periodo: "20 - 30 de jun.", valor: "R$ 250,00 noite", foto: "../../assets/img/logo1.PNG"},
    { id: 2, nome: "Florianópolis, SC", especificacao: "De frente para o mar", periodo: "10 - 20 de jan.", valor: "R$ 575,00 noite", foto: "../../assets/img/logo2.jpg"},
    { id: 3, nome: "São Paulo, SP", especificacao: "Próximo ao metrô", periodo: "15 - 20 de ago.", valor: "R$ 175,00 noite", foto: "../../assets/img/logo1.PNG"},
    { id: 4, nome: "Salvador, BA", especificacao: "De frente para o Farol da Barra", periodo: "10 - 20 de jan.", valor: "R$ 789,00 noite", foto: "../../assets/img/logo2.jpg"},
    { id: 5, nome: "Porto Alegre, RS", especificacao: "De frente para o parque Germânia", periodo: "20 - 30 de jun.", valor: "R$ 290,00 noite", foto: "../../assets/img/logo1.PNG"},
    { id: 6, nome: "Porto Alegre, RS", especificacao: "Vista para o Guaíba", periodo: "20 - 30 de jun.", valor: "R$ 250,00 noite", foto: "../../assets/img/logo2.jpg"},
    { id: 7, nome: "Porto Alegre, RS", especificacao: "Vista para o Guaíba", periodo: "20 - 30 de jun.", valor: "R$ 250,00 noite", foto: "../../assets/img/logo1.PNG"},
    { id: 8, nome: "Porto Alegre, RS", especificacao: "Vista para o Guaíba", periodo: "20 - 30 de jun.", valor: "R$ 250,00 noite", foto: "../../assets/img/logo1.PNG"},
    { id: 9, nome: "Florianópolis, SC", especificacao: "De frente para o mar", periodo: "10 - 20 de jan.", valor: "R$ 575,00 noite", foto: "../../assets/img/logo2.jpg"},
    { id: 10, nome: "São Paulo, SP", especificacao: "Próximo ao metrô", periodo: "15 - 20 de ago.", valor: "R$ 175,00 noite", foto: "../../assets/img/logo1.PNG"},
    { id: 11, nome: "Salvador, BA", especificacao: "De frente para o Farol da Barra", periodo: "10 - 20 de jan.", valor: "R$ 789,00 noite", foto: "../../assets/img/logo2.jpg"},
    { id: 12, nome: "Porto Alegre, RS", especificacao: "De frente para o parque Germânia", periodo: "20 - 30 de jun.", valor: "R$ 290,00 noite", foto: "../../assets/img/logo1.PNG"},
    { id: 13, nome: "Porto Alegre, RS", especificacao: "Vista para o Guaíba", periodo: "20 - 30 de jun.", valor: "R$ 250,00 noite", foto: "../../assets/img/logo2.jpg"},
    { id: 14, nome: "Porto Alegre, RS", especificacao: "Vista para o Guaíba", periodo: "20 - 30 de jun.", valor: "R$ 250,00 noite", foto: "../../assets/img/logo1.PNG"},
  ];

  listar(): Acomodacao[] {
    return this.listaAcomodacoes;
  };

  // listar(): Observable<Acomodacao[]> {
  //   return this.http.get<Acomodacao[]>(BASE_API);
  // }


  // buscarPorId(id: number): Observable<Acomodacao> {
  //   return this.id;
  // }


}
