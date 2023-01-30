import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { share } from 'rxjs';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Constants } from '../global/constants';
import { Eventos } from '../models/eventos.model';
import { EventosApiService } from '../services/eventos-api.service';

@Injectable({
  providedIn: 'root',
})
export class EventosService {
  private eventosListSubject = new BehaviorSubject<any>([]);
  eventosList$: Observable<Eventos[]> = this.eventosListSubject.asObservable();

  constructor(private router: Router, private eventosapiService: EventosApiService) {}

  public getEventos() {
    // if (this.eventosListSubject.value.length !== 0) return this.eventosList$;
    return this.eventosapiService.eventosGetApi<Eventos[]>(Constants.eventosUrlPrefix).pipe(
      tap((eventos) => {
        this.fetchEventoState(eventos);
      }),
      share()
    );
  }

  public createEvento(createEventoBody: Eventos) {
    return this.eventosapiService
      .eventosPostApi<Eventos>(Constants.eventosUrlPrefix, createEventoBody)
      .pipe(
        tap((evento) => {
          this.createEventoState(evento);
        })
      );
  }

  public updateEvento(updateEventoBody: Eventos) {
    const updateEventoUrl = `${Constants.eventosUrlPrefix}/${updateEventoBody.id}`;
    return this.eventosapiService.eventosPutApi<Eventos>(updateEventoUrl, updateEventoBody).pipe(
      tap((evento) => {
        this.updateEventoState(evento);
      })
    );
  }

  public deleteEvento(eventoId: number) {
    const deleteEventoUrl = `${Constants.eventosUrlPrefix}/${eventoId}`;
    return this.eventosapiService.eventosDeleteApi(deleteEventoUrl).pipe(
      tap(() => {
        this.deleteEventoState(eventoId);
      })
    );
  }

  public processEventoCreation() {
    this.router.navigate(['/']);
  }

  public processEventoUpdate() {
    this.router.navigate(['/']);
  }

  public fetchEventoState(eventoList: Eventos[]) {
    this.eventosListSubject.next(eventoList);
  }

  public createEventoState(evento: Eventos) {
    const existingEventos = this.eventosListSubject.value;
    this.eventosListSubject.next([...existingEventos, evento]);
  }

  public updateEventoState(evento: Eventos) {
    const existingEventos = [...this.eventosListSubject.value];
    const eventoIdx = existingEventos.findIndex((item) => item.id === evento.id);
    if (eventoIdx !== -1) {
      existingEventos[eventoIdx] = evento;
      this.eventosListSubject.next([...existingEventos]);
    }
  }

  public deleteEventoState(eventoId: number) {
    const existingEventos = [...this.eventosListSubject.value];
    const deletedItemState = existingEventos.filter((item) => item.id != eventoId);
    this.eventosListSubject.next([...deletedItemState]);
  }
}
