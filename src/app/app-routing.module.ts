import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuemSomosComponent } from './quem-somos/quem-somos.component';
import { ListaAcomodacoesComponent } from './lista-acomodacoes/lista-acomodacoes.component';
import { CadastroHospedagemComponent } from './cadastro-hospedagem/cadastro-hospedagem.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'home', component: ListaAcomodacoesComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'cadastro/cadastro-hospedagem', component: CadastroHospedagemComponent},
  { path: 'cadastro', component: CadastroUsuarioComponent},
  { path: 'hospedagem/:id', component: ListaAcomodacoesComponent },
  { path: 'quem-somos', component: QuemSomosComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
