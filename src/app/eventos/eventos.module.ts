import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventosRoutingModule } from './eventos-routing.module';
import { HomeComponent } from './home/home.component';
import { AdicionaComponent } from './adiciona/adiciona.component';
import { EditeComponent } from './edite/edite.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, AdicionaComponent, EditeComponent],
  imports: [CommonModule, FlexLayoutModule, FormsModule, EventosRoutingModule],
})
export class EventosModule {}
