import { Component } from '@angular/core';

@Component({
  selector: 'app-codigoqr',
  templateUrl: './codigoqr.component.html',
  styleUrl: './codigoqr.component.css'
})
export class CodigoqrComponent {
  meuQrCode: string = '';
  
  constructor() {
    this.meuQrCode = '256444d2-e763-4669-b279-2f17d218e6b6';
  }

}
