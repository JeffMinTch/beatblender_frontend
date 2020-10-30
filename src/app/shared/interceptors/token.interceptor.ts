import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { OktaAuthService } from '@okta/okta-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private oktaAuth: OktaAuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next));
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    // Only add an access token to whitelisted origins
    const allowedOrigins = ['http://localhost'];
    if (allowedOrigins.some(url => request.urlWithParams.includes(url))) {
      const accessToken = await this.oktaAuth.getAccessToken();
      console.log(accessToken);
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + accessToken
        }
      });
    }
    console.log(request);
    return next.handle(request).toPromise();
  }
}











// import { Injectable } from "@angular/core";
// import {
//   HttpEvent,
//   HttpInterceptor,
//   HttpHandler,
//   HttpRequest
// } from "@angular/common/http";
// import { Observable } from "rxjs";
// import { JwtAuthService } from "../services/auth/jwt-auth.service";

// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {

//   constructor(private jwtAuth: JwtAuthService) {}

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     var token = this.jwtAuth.token || this.jwtAuth.getJwtToken();

//     var changedReq;

//     if (token) {

//       changedReq = req.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`
//         },
//       });

//     } else {

//       changedReq = req;
      
//     }
//     return next.handle(changedReq);
//   }
// }
