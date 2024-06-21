import { Component, OnInit } from '@angular/core';
import { Acomodacao } from '../acomodacao';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
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
export class CadastroHospedagemComponent implements OnInit {

  idUsuario = '';

  firstFormGroup: FormGroup = new FormGroup({});
  secondFormGroup: FormGroup = new FormGroup({});

  isEditable = true;

  // listFiles: any[] = [];

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private acomodacaoService: AcomodacaoService) {
    
    // idUsuario é o ID do usuário que acabou de se cadastrar:
    this.idUsuario = this.acomodacaoService.getUsuarioId();
  }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      endereco: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      cep: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(30)]],
      valor: ['', Validators.required],
      descricao: ['', Validators.required],
      especificacao: ['', [Validators.required, Validators.maxLength(45)]],
      foto: ['']
    });
  }

  selecionarArquivos(event: any) {
    const arquivos = event.target.files;
    console.log("arquivos: ", arquivos);

    const fotos = Array.from(arquivos).map((arquivo:any) => arquivo.name);
    this.secondFormGroup?.get('foto')?.setValue(fotos);    
  }

  // selecionarArquivos(event: any) {
  //   const arquivos = event.target.files;
  //   console.log("arquivos: ", arquivos);

  //   const fotos = Array.from(arquivos).map((arquivo:any) => arquivo.name)
  //   this.secondFormGroup?.get('foto')?.setValue(fotos);    
  // }

  // selecionarArquivos(event: any) {
  //   const arquivos = event.target.files;
  //   console.log("arquivos, fotos",arquivos);

  //   const formData = new FormData(); 
    
  //   const fotos = Array.from(arquivos).map(
  //     (file:any) => {
  //     formData.append("foto", file);    
  //     }
  //     )
  //   this.secondFormGroup?.get('foto')?.setValue(fotos);    
  // }

  cadastrarHospedagem() {
    const hospedagem: Acomodacao = {
      id_usuario: this.idUsuario,
      nome: this.secondFormGroup?.get('nome')?.value,
      endereco: this.firstFormGroup?.get('endereco')?.value,
      numero: this.firstFormGroup?.get('numero')?.value,
      complemento: this.firstFormGroup?.get('complemento')?.value,
      bairro: this.firstFormGroup?.get('bairro')?.value,
      cidade: this.firstFormGroup?.get('cidade')?.value,
      estado: this.firstFormGroup?.get('estado')?.value,
      cep: this.firstFormGroup?.get('cep')?.value,
      valor: this.secondFormGroup?.get('valor')?.value,
      descricao: this.secondFormGroup?.get('descricao')?.value,
      especificacao: this.secondFormGroup?.get('especificacao')?.value,
      foto: this.secondFormGroup?.get('foto')?.value,
    };

    this.acomodacaoService.cadastrarHospedagem(hospedagem).subscribe(
      (hospedagem) => {
        console.log(hospedagem);
        
      }
    )


}

}