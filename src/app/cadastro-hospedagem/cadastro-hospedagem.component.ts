import { Component } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select'

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AcomodacaoService } from '../acomodacao.service';

// somente utilizado para POST e PUT:
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Component({
  selector: 'app-cadastro-hospedagem',
  templateUrl: './cadastro-hospedagem.component.html',
  styleUrl: './cadastro-hospedagem.component.css'
})
export class CadastroHospedagemComponent {

  IdUsuario = '';

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  isEditable = true;

  constructor(private _formBuilder: FormBuilder, private http: HttpClient, private acomodacaoService: AcomodacaoService) {
    
    // IdUsuario é o ID do usuário que acabou de se cadastrar:
    this.IdUsuario = this.acomodacaoService.getUsuarioId();
  }

  cadastrarHospedagem(): void {
    if(this.firstFormGroup.valid && this.secondFormGroup.valid) {
      const hospedagem = this.firstFormGroup.value
      // this.acomodacaoService.cadastrarHospedagem(hospedagem, this.IdUsuario);
      console.log("HOSPEDAGEM SALVA :", hospedagem);
      console.log("ID_USUARIO :", this.IdUsuario);
    }
  }
}
