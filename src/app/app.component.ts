import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gluten-free-bnb';

  items = [
    { 
      imageUrl: '../../assets/img/logo2.jpg',
      text1: 'Porto Alegre, RS',
      text2: 'Vista para o Guaíba',
      text3: '20 - 30 de jun.',
      text4: 'R$ 250,00 noite'
    },
    {
      imageUrl: '../../assets/img/logo1.PNG',
      text1: 'Porto Alegre, RS',
      text2: 'Vista para o Guaíba',
      text3: '20 - 30 de jun.',
      text4: 'R$ 250,00 noite'
    }
  ];
}
