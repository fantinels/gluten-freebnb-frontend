import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../usuario.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.css'
})
export class CadastroUsuarioComponent implements OnInit {

  isEditable = true;

  tipos = [
    { value: 1, label: 'Hóspede' },
    { value: 2, label: 'Anfitrião' }
  ];
  
  cadastroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      tel: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      uf: ['', [Validators.required]],
      dt_nascimento: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.maxLength(11)]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  cadastrarUsuario(): void {
    if (this.cadastroForm.valid) {
      this.usuarioService.cadastrarUsuario(this.cadastroForm.value)
        .pipe(
          catchError(error => {
            console.error('Erro ao cadastrar usuário', error);
            throw error
          })
        )
        .subscribe(response => {
          console.log('Usuário cadastrado com sucesso', response);
          // Aqui você pode fazer algo após o sucesso do cadastro, como redirecionar o usuário para a próxima etapa
        });
    }
  }

  // Método para verificar se o tipo de cadastro selecionado é "Hóspede"
  isTipoHospede(): boolean {
    return this.cadastroForm.get('tipo')?.value === 1;
  }
}