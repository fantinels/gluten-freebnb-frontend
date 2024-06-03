import { Injectable } from '@angular/core';
import { Acomodacao } from './acomodacao';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const BASE_API = "http://localhost:3001/api/hospedagem";

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

  // buscarPorId(id: number): Observable<Acomodacao> {
  //   return this.id;
  // }


}
