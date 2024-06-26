import { ChangeDetectorRef, Component } from '@angular/core';
import { AcomodacaoService } from '../acomodacao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Acomodacao } from '../acomodacao';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-editar-hospedagem',
  templateUrl: './editar-hospedagem.component.html',
  styleUrl: './editar-hospedagem.component.css'
})
export class EditarHospedagemComponent {
  id_hospedagem: any;
  hospedagem: any = '';
  fotosTratadas: string[] = [];

  mostrarBotao = false;
  todosHabilitados = true;
  isDisable = true;

  id_usuario: any;

  constructor(private acomodacaoService: AcomodacaoService, private usuarioService: UsuarioService, private activatedRoute: ActivatedRoute, private changeDetectorRef: ChangeDetectorRef, private router: Router) {
    this.activatedRoute.params.subscribe((params) => {
      this.id_hospedagem = params['id'];
      console.log("id_hosp: ", this.id_hospedagem);
      
    });

    this.acomodacaoService.buscarHospedagemPorIdHospedagem(this.id_hospedagem).subscribe((hosp) => {
      this.hospedagem = hosp;
      if(this.hospedagem.foto.indexOf('{') < 0) {
        this.fotosTratadas.push(this.hospedagem.foto);
        console.log("1fotos index < 0: ", this.hospedagem.foto);
        console.log("1fotosTratadas index < 0: ", this.fotosTratadas);
        
      } else {
        this.hospedagem.foto = this.hospedagem.foto.replace(/{|}|"/g, '');
        this.fotosTratadas = this.hospedagem.foto.split(',');
        console.log("2fotos index >= 0: ", this.hospedagem.foto);
        console.log("2fotosTratadas index < 0: ", this.fotosTratadas);
      }
      this.changeDetectorRef.detectChanges();
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
      if(!input.disabled) {
        this.todosHabilitados = false;
      }
    });    
    this.mostrarBotao = this.todosHabilitados;
  }

  desabilitarInputs(): void {
    this.isDisable = true;
    this.mostrarBotao = false;
    this.changeDetectorRef.detectChanges();
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


  // AS FOTOS AINDA NÃO ESTÃO FUNCIONANDO! AO EDITAR QUALQUER ELEMENTO, AS FOTOS SOMEM!
  editarHospedagem(id: any): void {
    const hospedagemAtualizada: Acomodacao = {
      nome: this.hospedagem.nome,
      endereco: this.hospedagem.endereco,
      numero: this.hospedagem.numero,
      complemento: this.hospedagem.complemento,
      bairro: this.hospedagem.bairro,
      cidade: this.hospedagem.cidade,
      estado: this.hospedagem.estado,
      cep: this.hospedagem.cep,
      valor: this.hospedagem.valor,
      descricao: this.hospedagem.descricao,
      especificacao: this.hospedagem.especificacao,
      foto: this.fotosTratadas,
    };
  
    const formData = new FormData();
    formData.append("nome", this.hospedagem.nome);
    formData.append("endereco", this.hospedagem.endereco);
    formData.append("numero", this.hospedagem.numero);
    formData.append("complemento", this.hospedagem.complemento);
    formData.append("bairro", this.hospedagem.bairro);
    formData.append("cidade", this.hospedagem.cidade);
    formData.append("estado", this.hospedagem.estado);
    formData.append("cep", this.hospedagem.cep);
    formData.append("valor", this.hospedagem.valor);
    formData.append("descricao", this.hospedagem.descricao);
    formData.append("especificacao", this.hospedagem.especificacao);
  
    for(let foto of this.fotosTratadas) {
      formData.append("foto", foto);
      console.log("FOTO-FOR: ", foto); 
    }
  
    this.acomodacaoService.editarHospedagem(id, formData).subscribe(
      (response) => {
        this.changeDetectorRef.detectChanges();
        this.desabilitarInputs()
      }
    );
  }


}
