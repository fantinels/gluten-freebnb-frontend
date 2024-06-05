import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../usuario.service';
import { catchError } from 'rxjs/operators';

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
      cpf: ['', [Validators.required, Validators.maxLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      tipo: ['', [Validators.required]]
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
          const userId = response.id; // Pega ID do usuário recém cadastrado
          console.log('Novo ID do usuário:', userId);
        });
    }
  }

  // Método para verificar se o tipo de cadastro selecionado é "Hóspede"
  isTipoHospede(): boolean {
    return this.cadastroForm.get('tipo')?.value === 1;
  }
}