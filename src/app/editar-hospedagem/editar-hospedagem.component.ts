import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AcomodacaoService } from '../acomodacao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Acomodacao } from '../acomodacao';
import { UsuarioService } from '../usuario.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editar-hospedagem',
  templateUrl: './editar-hospedagem.component.html',
  styleUrl: './editar-hospedagem.component.css'
})
export class EditarHospedagemComponent implements OnInit {
  id_hospedagem: any;
  hospedagem: any = '';
  fotosTratadas: string[] = [];

  mostrarBotao = false;
  todosHabilitados = true;
  isDisable = true;

  mostrarBotaoFotos = false;

  id_usuario: any;

  fotoFormGroup: FormGroup = new FormGroup({});

  constructor(private acomodacaoService: AcomodacaoService, private usuarioService: UsuarioService, private activatedRoute: ActivatedRoute, private changeDetectorRef: ChangeDetectorRef, private router: Router, private formBuilder: FormBuilder) {
    this.activatedRoute.params.subscribe((params) => {
      this.id_hospedagem = params['id'];
      console.log("id_hosp: ", this.id_hospedagem);
      
    });

    this.acomodacaoService.buscarHospedagemPorIdHospedagem(this.id_hospedagem).subscribe((hosp) => {
      this.hospedagem = hosp;
      if(this.hospedagem.foto.indexOf('{') < 0) {
        this.fotosTratadas.push(this.hospedagem.foto);
        
      } else {
        this.hospedagem.foto = this.hospedagem.foto.replace(/{|}|"/g, '');
        this.fotosTratadas = this.hospedagem.foto.split(',');
      }
      this.changeDetectorRef.detectChanges();
    });

  }

  ngOnInit(): void {
    this.fotoFormGroup = this.formBuilder.group({
      foto: this.formBuilder.array([])
    });
  }

  getUsuarioId(): void {
    this.usuarioService.getUsuarioId().subscribe(
      (usuario_id: any) => {
        usuario_id = this.id_usuario
      }
    )
  }

  habilitarInputs(): void {
    this.isDisable = false

    const inputs = document.querySelectorAll('input');
    
    inputs.forEach( (input) => {
      if(!input.disabled && input.id != "upload") {
        this.todosHabilitados = false;
      }
    });    
    this.mostrarBotao = this.todosHabilitados;
  }

  desabilitarInputs(): void {
    this.isDisable = true;
    this.mostrarBotao = false;
    window.location.reload()
  }

  cancelarEditarFotos(): void {
    this.mostrarBotaoFotos = false;
  }

  excluirHospedagem(id: any): void {
    if(confirm("Tem certeza que deseja excluir esta hospedagem?")) {
      this.acomodacaoService.excluirHospedagem(id).subscribe(
        (hospedagem) => {
          this.router.navigate(['/perfil'])
          .then( () => {
            window.location.reload();
          })
        }
      )
    }
  }

  editarFotos(): void {
    if(confirm("Se prosseguir, terá de realizar o upload de todas as fotos novamente.")) {
      this.mostrarBotaoFotos = true;
    }
  }

  createItem(data: any): FormGroup {
    return this.formBuilder.group(data);
  }

  get foto(): FormArray {
    return this.fotoFormGroup?.get('foto') as FormArray; 
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

  editarFotosHospedagem() {
    if(confirm("Você tem certeza que quer atualizar suas fotos?")) {
      const formData = new FormData();
      
      for(let foto of this.foto.value) {
        formData.append("foto", foto.file);
      }
  
      this.acomodacaoService.editarFotosHospedagem(this.id_hospedagem, formData).subscribe(
        (hospedagem) => {
          this.router.navigate([`/hospedagem/${this.id_hospedagem}/editar`])
          .then( () => {
            window.location.reload();
          })
        }
      )
    }
  }

  editarHospedagem(id: any) {
    this.acomodacaoService.editarHospedagem(id, this.hospedagem).subscribe(
      (hosp) => {
        this.hospedagem = hosp
        this.isDisable = true;
        this.mostrarBotao = false;
        this.changeDetectorRef.detectChanges();
      }
    )
  }
}
