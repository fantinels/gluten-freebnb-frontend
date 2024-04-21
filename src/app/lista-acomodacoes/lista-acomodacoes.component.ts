import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lista-acomodacoes',
  templateUrl: './lista-acomodacoes.component.html',
  styleUrl: './lista-acomodacoes.component.css'
})
export class ListaAcomodacoesComponent {
  @Input() imageUrl?: string;
  @Input() text1?: string;
  @Input() text2?: string;
  @Input() text3?: string;
  @Input() text4?: string;
}
