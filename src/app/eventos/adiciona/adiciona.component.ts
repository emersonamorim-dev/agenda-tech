import { Component, OnInit } from '@angular/core';
import { Eventos } from 'src/app/models/eventos.model';
import { EventosService } from '../eventos.service';

@Component({
  selector: 'app-adiciona',
  templateUrl: './adiciona.component.html',
  styleUrls: ['./adiciona.component.scss'],
})
export class AdicionaComponent implements OnInit {
  eventoForm: Eventos = {
    id: 0,
    titulo: '',
    descricao: '',
    likes: 0,
  };

  constructor(private readonly eventosService: EventosService) {}

  public ngOnInit(): void {}

  public adicionaNewEvento() {
    if (this.eventoForm.titulo && this.eventoForm.descricao) {
      const newEvento$ = this.eventosService.createEvento(this.eventoForm);
      newEvento$.subscribe((evento) => {
        this.eventosService.processEventoCreation();
      });
    }
  }
}
