import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ListaAcomodacoesComponent } from './lista-acomodacoes/lista-acomodacoes.component';
import { QuemSomosComponent } from './quem-somos/quem-somos.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListaAcomodacoesComponent,
    QuemSomosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
