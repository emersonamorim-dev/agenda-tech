import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventosApiService {
  constructor(private http: HttpClient) {}

  public eventosGetApi<ModelType>(url: string, headers = {}) {
    return this.http
      .get<ModelType>(url, { headers })
      .pipe(catchError(this.handleError));
  }

  public eventosPostApi<ModelType>(url: string, body = {}, headers = {}) {
    return this.http
      .post<ModelType>(url, body, { headers })
      .pipe(catchError(this.handleError));
  }

  public eventosPutApi<ModelType>(url: string, body = {}, headers = {}) {
    return this.http
      .put<ModelType>(url, body, { headers })
      .pipe(catchError(this.handleError));
  }

  public eventosDeleteApi(url: string, headers = {}) {
    return this.http
      .delete(url, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError() {
    return EMPTY;
  }
}
