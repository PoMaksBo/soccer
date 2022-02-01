import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const user = this.auth.userValue
    // const isLoggedIn = user && user.token
    // const isApiUrl = req.url.startsWith(environment.apiUrl);
    // if (isLoggedIn && isApiUrl) {
    //   req = req.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${user.token}`
    //     }
    //   });
    // } else {
      req = req.clone({
        setHeaders: {
          Cookie: 'csrftoken=516AAMvkM12aRfoEJwGF2v2z52J9poY8UDdYqGlGVhFRQJ5T1g4WVgmYbQXEGxzW'
        }
      });
    // }
    return next.handle(req)
  }
}
