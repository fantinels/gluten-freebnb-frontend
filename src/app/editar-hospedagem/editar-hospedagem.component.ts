import { ChangeDetectorRef, Component } from '@angular/core';
import { AcomodacaoService } from '../acomodacao.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-hospedagem',
  templateUrl: './editar-hospedagem.component.html',
  styleUrl: './editar-hospedagem.component.css'
})
export class EditarHospedagemComponent {
  id: any;
  hospedagem: any = '';
  fotosTratadas: string[] = [];

  mostrarBotao = false;
  todosHabilitados = true;
  isDisable = true;

  constructor(private acomodacaoService: AcomodacaoService, private activatedRoute: ActivatedRoute, private changeDetectorRef: ChangeDetectorRef, private router: Router) {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.acomodacaoService.buscarHospedagemPorIdHospedagem(this.id).subscribe((hosp) => {
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
  }

  excluirHospedagem(id: any): void {
    if(confirm("Tem certeza que deseja excluir esta hospedagem?")) {
      this.acomodacaoService.excluirHospedagem(id).subscribe(
        (hospedagem) => {
          console.log("Hosp. Excluída: ", hospedagem);
          this.router.navigate(['/perfil'])
          .then( () => {
            window.location.reload();
          })
        }
      )
    }
  }

  // Lembrar de pegar o ID da hospedagem pelo params
  editarHospedagem(): void {
    alert('Funciona!');
  }


}
