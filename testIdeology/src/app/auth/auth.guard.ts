import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(
    private authSvc: AuthService,
    private router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    console.log('AuthGuard#canActivate called');
    return this.authSvc.isLoggedIn$.pipe(
      map(isLoggedIn => {
        console.log('isLoggedIn value:', isLoggedIn);  
        if (isLoggedIn) {
          console.log('User is logged in');
          return true;
        } else {
          console.log('User is not logged in, redirecting to home');
          this.router.navigate(['/']);
          return false;
        }
      })
    );
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    console.log('AuthGuard#canActivateChild called');
    return this.authSvc.isLoggedIn$.pipe(
      map(isLoggedIn => {
        if (isLoggedIn) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      })
    );
  }
  
}
