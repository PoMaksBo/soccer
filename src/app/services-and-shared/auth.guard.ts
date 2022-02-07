import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const user = localStorage.getItem('user');
    if (user) {
      // authorised so return true
      return of(true);
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'])
    return of(false);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> {
    return this.canActivate(route, state)
  }

}
