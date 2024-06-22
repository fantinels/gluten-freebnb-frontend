import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../usuario.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.css'
})
export class CadastroUsuarioComponent implements OnInit {

  hidePassword = true;

  errorMessage: string = '';


  atualizarPagina() {
    this.router.navigate(['/home'])
      .then( () => {
        window.location.reload()
    });
  }

  isEditable = true;

  tipos = [
    { value: 1, label: 'Hóspede' },
    { value: 2, label: 'Anfitrião' }
  ];

  cadastroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required]],
      sobrenome: ['', [Validators.required]],
      cpf: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      tipo: ['', [Validators.required]]
    });
  }

  cadastrarUsuario(): void {
    if (this.cadastroForm.valid) {
      this.usuarioService.cadastrarUsuario(this.cadastroForm.value).subscribe(
        (usuario) => {
          sessionStorage.setItem('usuario.nome', usuario.nome);
          sessionStorage.setItem('usuario.id', usuario.id);
        },
        error => {
          this.errorMessage = 'Verifique os dados informados!';
        }
      );
      }
  }

  cadastrarUsuarioEHospedagem(): void {
    if (this.cadastroForm.valid) {
      this.usuarioService.cadastrarUsuario(this.cadastroForm.value)
        .pipe(
          catchError(error => {
            console.error('Erro ao cadastrar usuário', error);
            throw error
          })
        )
        .subscribe(usuario => {
          sessionStorage.setItem('usuario.nome', usuario.nome);
          sessionStorage.setItem('usuario.id', usuario.id);
          console.log(usuario.id)
      });
    }
  }


  // Método para verificar se o tipo de cadastro selecionado é "Hóspede"
  isTipoHospede(): boolean {
    return this.cadastroForm.get('tipo')?.value === 1;
  }
}