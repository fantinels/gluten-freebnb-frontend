import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AcomodacaoService } from '../acomodacao.service';

@Component({
  selector: 'app-detalhes-hospedagem',
  templateUrl: './detalhes-hospedagem.component.html',
  styleUrl: './detalhes-hospedagem.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetalhesHospedagemComponent {
  id: any;
  hospedagem: any = '';
  fotosTratadas: string[] = [];


  constructor(private activatedRoute: ActivatedRoute, private acomodacaoService: AcomodacaoService, private changeDetectorRef: ChangeDetectorRef) {

    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    })

    this.acomodacaoService.buscarHospedagemPorIdHospedagem(this.id).subscribe((hosp) => {
      this.hospedagem = hosp;
      if(this.hospedagem.foto.indexOf('{') < 0) {
        this.fotosTratadas.push(this.hospedagem.foto);
      } else {
        this.hospedagem.foto = this.hospedagem.foto.replace(/{|}|"/g, '');
        this.fotosTratadas = this.hospedagem.foto.split(',');
      }
      this.changeDetectorRef.detectChanges();
    })
    
  }

}
