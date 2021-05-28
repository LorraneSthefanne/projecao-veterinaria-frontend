import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../_services/authentication.service';

interface IUrls {
  descricao: string;
  url: string;
}

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.addHeaderToken(request);
    return next.handle(request);
  }

  private addHeaderToken(request: HttpRequest<any>): HttpRequest<any> {
    const currentUserValue = this.authenticationService.currentUserValue;
    if (currentUserValue && currentUserValue?.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUserValue.token}`,
        },
      });
    }
    return request;
  }
}
