import { Component } from '@angular/core';

@Component({
  selector: 'app-codigoqr',
  templateUrl: './codigoqr.component.html',
  styleUrl: './codigoqr.component.css'
})
export class CodigoqrComponent {
  meuQrCode: string = '';
  
  constructor() {
    this.meuQrCode = 'Hospedagem reservada com sucesso!';
  }

}
