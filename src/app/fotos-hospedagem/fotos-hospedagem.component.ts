import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fotos-hospedagem',
  templateUrl: './fotos-hospedagem.component.html',
  styleUrl: './fotos-hospedagem.component.css'
})
export class FotosHospedagemComponent {

  @Input() fotos: string = '';

  fotosTratadas: string[] = [];

  ngOnInit() {
    if(this.fotos.indexOf('{') < 0) {
      this.fotosTratadas.push(this.fotos);
    } else {
      this.fotos = this.fotos.replace(/{|}|"/g, '');
      // console.log('this.fotos',this.fotos);
      this.fotosTratadas = this.fotos.split(',');
      // console.log('FOTOS TRATADAS',this.fotosTratadas);
    }
  }

}
