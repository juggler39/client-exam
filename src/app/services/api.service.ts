import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry, shareReplay } from "rxjs";
import { IAnimal } from "../model/animal.interface";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) { };
  ANIMAL_API = 'http://localhost:4200/animals';
  /**
   * Get All Employee request.
   */
  getAllEmployes(): Observable<any> {
    return this.http
      .get<any>(this.ANIMAL_API, { observe: "response" })
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  loadAnimals(): Observable<IAnimal[]> {
    return this.http.get<IAnimal[]>(this.ANIMAL_API, { responseType: 'json' }).pipe(
      shareReplay(1),
      retry(3),
      catchError(this.handleError)
    );
  }

  /**
   * Add a new employee post requts.
   * @param employee a new employee to add.
   */
  addEmployee(employee: any): Observable<any> {
    return this.http
      .post<any>("http://localhost:4200/animals", employee, {
        observe: "response",
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Delete an employee request method.
   * @param empId employee unique id
   */
  deleteEmployee(empId: any) {
    return this.http
      .delete<any>("http://localhost:4200/animals/" + empId, {
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
