import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdicionaComponent } from './adiciona/adiciona.component';
import { EditeComponent } from './edite/edite.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'adiciona', component: AdicionaComponent },
  { path: 'edite/:id', component: EditeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventosRoutingModule {}
