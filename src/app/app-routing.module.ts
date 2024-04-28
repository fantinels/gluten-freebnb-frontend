import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuemSomosComponent } from './quem-somos/quem-somos.component';

const routes: Routes = [
  { path: 'quem-somos', component: QuemSomosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
