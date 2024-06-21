import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AcomodacaoService } from '../acomodacao.service';

@Component({
  selector: 'app-detalhes-hospedagem',
  templateUrl: './detalhes-hospedagem.component.html',
  styleUrl: './detalhes-hospedagem.component.css'
})
export class DetalhesHospedagemComponent {
  id: any;
  hospedagem: any = '';

  constructor(private activatedRoute: ActivatedRoute, private acomodacaoService: AcomodacaoService) {

    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    })

    this.acomodacaoService.buscarHospedagemPorIdHospedagem(this.id).subscribe((hosp) => {
      this.hospedagem = hosp;
      console.log("hosp", hosp);
      console.log("hospedagem", this.hospedagem);
    })
    
  }


}
