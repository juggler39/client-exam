import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry, shareReplay } from "rxjs";
import { IEvent } from "@model/event.model";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) { };
  ANIMAL_API = 'http://localhost:4200/events';

  addEvent(event: any): Observable<any> {
    return this.http.post<any>(this.ANIMAL_API, event, {
      observe: "response",
    })
      .pipe(catchError(this.handleError));
  }

  loadEvents(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(this.ANIMAL_API, { responseType: 'json' }).pipe(
      shareReplay(1),
      retry(3),
      catchError(this.handleError)
    );
  }

  updateEvent(event: any): Observable<any> {
    return this.http.patch<any>(this.ANIMAL_API, event, { observe: "response", })
      .pipe(catchError(this.handleError));
  }

  deleteEvent(eventId: string) {
    return this.http
      .delete<any>(`${this.ANIMAL_API}/${eventId}`, { observe: "response", })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError(() => "Something bad happened; please try again later.");
  }
}
