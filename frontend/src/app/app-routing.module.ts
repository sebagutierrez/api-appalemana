import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscadorComponent } from './components/buscador/buscador.component';
import { ResultadosComponent } from './components/resultados/resultados.component';
import { CohortesComponent } from './components/cohortes/cohortes.component';
import { NuevacohorteComponent } from './components/nuevacohorte/nuevacohorte.component';
import { ModificarcohorteComponent } from './components/modificarcohorte/modificarcohorte.component'

const routes: Routes = [
  { path: '', component: BuscadorComponent },
  { path: 'results/:searchInput', component: ResultadosComponent },
  { path: 'cohortes', component: CohortesComponent },
  { path: 'cohortes/new', component: NuevacohorteComponent },
  { path: 'cohortes/modify/:id', component: ModificarcohorteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }