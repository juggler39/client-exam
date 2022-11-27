import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry, shareReplay } from "rxjs";
import { IAnimal } from "../model/animal.model";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) { };
  ANIMAL_API = 'http://localhost:4200/animals';

  loadAnimals(): Observable<IAnimal[]> {
    return this.http.get<IAnimal[]>(this.ANIMAL_API, { responseType: 'json' }).pipe(
      shareReplay(1),
      retry(3),
      catchError(this.handleError)
    );
  }


  addEvent(event: any): Observable<any> {
    return this.http.post<any>(this.ANIMAL_API, event, {
      observe: "response",
    })
      .pipe(catchError(this.handleError));
  }

  updateEvent(event: any): Observable<any> {
    return this.http.patch<any>(this.ANIMAL_API, event, {
      observe: "response",
    })
      .pipe(catchError(this.handleError));
  }

  deleteAnimal(eventId: string) {
    return this.http
      .delete<any>(`${this.ANIMAL_API}/${eventId}`, {
        observe: "response",
      })
      .pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }
}
