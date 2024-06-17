import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


const apiUrl = "http://localhost:3001/api/usuario";
// const apiUrl = "https://gluten-freebnb-backend.onrender.com/api/usuario";

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

  getUsuarioNome(): any {
    const usuario = localStorage.getItem('usuario.nome');
    return usuario;
  }

  logout() {
    localStorage.removeItem('usuario.nome');
    sessionStorage.removeItem('usuario.id');
  }

  constructor(private http: HttpClient) { }

  listarUsuarios(): Observable<any> {
    return this.http.get<any>(apiUrl)
  }

  getUsuarioId(): any {
    const usuarioId = sessionStorage.getItem('usuario.id');
    return usuarioId;
  }

  usuarioPeloId(): Observable<any> {
    return this.http.get<any>(`${apiUrl}/${this.getUsuarioId()}`);
  }

  cadastrarUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(apiUrl, usuario, httpOptions)
  }

  login(email: string, senha: string): Observable<any> {
    return this.http.get<any>(`${apiUrl}/email/${email}`)
    .pipe(
      catchError(error => {
        throw error;
      })
    )
  }

  

}
