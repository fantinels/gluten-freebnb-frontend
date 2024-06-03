import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


const apiUrl = "http://localhost:3001/api/usuario";

// somente utilizado para POST e PUT:
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  cadastrarUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(apiUrl, usuario, httpOptions)
    .pipe(
      catchError(error => {
        throw error;
      })
    );
  }
  
}
