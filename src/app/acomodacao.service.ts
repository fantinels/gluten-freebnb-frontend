import { Injectable } from '@angular/core';
import { Acomodacao } from './acomodacao';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// const BASE_API = "http://localhost:3001/api/hospedagem";
const BASE_API = "https://gluten-freebnb-backend.onrender.com/api/hospedagem";

// somente utilizado para POST e PUT:
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AcomodacaoService {
    
  // parâmetro do constructor: private http: HttpClient
  constructor(private http: HttpClient) { }
  
  listar(): Observable<Acomodacao[]> {
    return this.http.get<Acomodacao[]>(BASE_API);
  }

  getUsuarioId(): any {
    const usuarioId = sessionStorage.getItem('usuario.id');
    return usuarioId;
  }

  cadastrarHospedagem(acomodacao: any): Observable<any> {
    return this.http.post<any>(`${BASE_API}/${this.getUsuarioId()}`, acomodacao, httpOptions);
  }

  listarHospedagemPorIdUsuario(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_API}/user/${this.getUsuarioId()}`)
  }

  excluirHospedagem(id: any): Observable<any>{
    return this.http.delete<any>(`${BASE_API}/${id}`);
  }

  buscarHospedagemPorIdHospedagem(id: any): Observable<any[]> {
    return this.http.get<any>(`${BASE_API}/${id}`);
  }



}
