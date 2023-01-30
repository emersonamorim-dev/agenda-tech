import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Eventos } from 'src/app/models/eventos.model';
import { switchMap, map } from 'rxjs';
import { EventosService } from '../eventos.service';

@Component({
  selector: 'app-edite',
  templateUrl: './edite.component.html',
  styleUrls: ['./edite.component.scss'],
})
export class EditeComponent implements OnInit {
  eventoForm: Eventos = {
    id: 0,
    titulo: '',
    descricao: '',
    likes: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readonly eventosService: EventosService
  ) {}

  public ngOnInit(): void {

    const fetchEvento$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const eventoId = Number(params.get('id'));
        return this.eventosService.eventosList$.pipe(
          map((arr) => arr.find((item) => item.id === eventoId))
        );
      })
    );
    fetchEvento$.subscribe((data) => {
      if (data) this.eventoForm = { ...data };
      else this.router.navigate(['/']);
    });
  }

  public editeEvento() {
    if (this.eventoForm.titulo && this.eventoForm.descricao) {
      const updateEvento$ = this.eventosService.updateEvento(this.eventoForm);
      updateEvento$.subscribe((evento) => {
        this.eventosService.processEventoUpdate();
      });
    }
  }
}
