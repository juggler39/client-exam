import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";

@Injectable()
export class MockBackendHttpInterceptor implements HttpInterceptor {

  private _eventsJsonPath = "assets/data.json";

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.handleRequests(req, next);
  }

  handleRequests(req: HttpRequest<any>, next: HttpHandler): any {

    const { url, method } = req;

    if (url.endsWith("/events") && method === "GET") {
      req = req.clone({
        url: this._eventsJsonPath,
      });
      return next.handle(req).pipe(delay(500));
    }

    if (url.endsWith("/events") && method === "POST") {
      const { body } = req.clone();
      return of(new HttpResponse({ status: 200, body })).pipe(delay(500));
    }

    if (url.endsWith("/events") && method === "PATCH") {
      const { body } = req.clone();
      return of(new HttpResponse({ status: 200, body })).pipe(delay(500));
    }

    if (url.match(/\/events\/.*/) && method === "DELETE") {

      const urlValues = url.split("/");
      const empId = urlValues[urlValues.length - 1];

      return of(new HttpResponse({ status: 200, body: empId })).pipe(
        delay(500)
      );
    }
    return next.handle(req);
  }
}

export let mockBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: MockBackendHttpInterceptor,
  multi: true,
};
