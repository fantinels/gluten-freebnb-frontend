import { Component, OnInit } from '@angular/core';
import { Acomodacao } from '../acomodacao';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, Form, FormArray} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select'

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AcomodacaoService } from '../acomodacao.service';

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
      foto: this.formBuilder.array([])
    });
  }

  createItem(data: any): FormGroup {
    return this.formBuilder.group(data);
  }

  get foto(): FormArray {
    return this.secondFormGroup?.get('foto') as FormArray; 
  }

  selecionarArquivos(event: any) {
    const arquivos = event.target.files;

    for(let arquivo of arquivos) {
      let reader = new FileReader();
      reader.onload = (e:any) => {
        this.foto.push(this.createItem({
          file: arquivo,
          url: e.target.result
        }))
      }
      reader.readAsDataURL(arquivo);
    } 
    }

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
      foto: this.foto.value,
    };

    const formData = new FormData();
    formData.append("id_usuario", this.idUsuario);
    formData.append("nome", this.secondFormGroup?.get('nome')?.value);
    formData.append("endereco", this.firstFormGroup?.get('endereco')?.value);
    formData.append("numero", this.firstFormGroup?.get('numero')?.value);
    formData.append("complemento", this.firstFormGroup?.get('complemento')?.value);
    formData.append("bairro", this.firstFormGroup?.get('bairro')?.value);
    formData.append("cidade", this.firstFormGroup?.get('cidade')?.value);
    formData.append("estado", this.firstFormGroup?.get('estado')?.value);
    formData.append("cep", this.firstFormGroup?.get('cep')?.value);
    formData.append("valor", this.secondFormGroup?.get('valor')?.value);
    formData.append("descricao", this.secondFormGroup?.get('descricao')?.value);
    formData.append("especificacao", this.secondFormGroup?.get('especificacao')?.value);
    console.log("cidade: ", this.secondFormGroup?.get('cidade')?.value);
    
    for(let foto of this.foto.value) {
      formData.append("foto", foto.file);
    }

    this.acomodacaoService.cadastrarHospedagem(formData).subscribe(
      (hospedagem) => {
        console.log(hospedagem);
        
      }
    )


}

}