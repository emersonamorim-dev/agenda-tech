import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Eventos } from 'src/app/models/eventos.model';
import { EventosService } from '../eventos.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  eventoArr$: Observable<Eventos[]>;
  private eventoSub: Subscription;

  constructor(
    private readonly eventosService: EventosService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.changeDetectorRef.detach();
    this.fetchEventos();
    this.eventoArr$ = this.eventosService.eventosList$;
    this.changeDetectorRef.reattach();
  }

  public refreshEventos() {
    this.fetchEventos();
  }

  public fetchEventos() {
    this.eventoSub = this.eventosService.getEventos().subscribe();
  }

  public deleteItem(eventoId: number) {
    if (eventoId) this.eventosService.deleteEvento(eventoId).subscribe();
  }

  public identify(index, item) {
    return item.id;
  }

  public ngOnDestroy(): void {
    this.eventoSub?.unsubscribe();
  }
}
