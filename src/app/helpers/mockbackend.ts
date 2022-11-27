import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpClient,
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class MockBackendHttpInterceptor implements HttpInterceptor {
  // default employes json path
  private _employeeJsonPath = "assets/data.json";

  constructor(private http: HttpClient) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.handleRequests(req, next);
  }

  /**
   * Handle request's and support with mock data.
   * @param req
   * @param next
   */
  handleRequests(req: HttpRequest<any>, next: HttpHandler): any {

    const { url, method } = req;

    if (url.endsWith("/animals") && method === "GET") {
      req = req.clone({
        url: this._employeeJsonPath,
      });
      return next.handle(req).pipe(delay(500));
    }

    if (url.endsWith("/animals") && method === "POST") {
      const { body } = req.clone();
      return of(new HttpResponse({ status: 200, body })).pipe(delay(500));
    }

    if (url.endsWith("/animals") && method === "PATCH") {
      const { body } = req.clone();
      return of(new HttpResponse({ status: 200, body })).pipe(delay(500));
    }

    if (url.match(/\/animals\/.*/) && method === "DELETE") {

      const urlValues = url.split("/");
      const empId = urlValues[urlValues.length - 1];

      return of(new HttpResponse({ status: 200, body: empId })).pipe(
        delay(500)
      );
    }
    // if there is not any matches return default request.
    return next.handle(req);
  }
}

/**
 * Mock backend provider definition for app.module.ts provider.
 */
export let mockBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: MockBackendHttpInterceptor,
  multi: true,
};
