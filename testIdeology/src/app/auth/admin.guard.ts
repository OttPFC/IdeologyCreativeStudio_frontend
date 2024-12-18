import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import iziToast from 'izitoast';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isAdmin().pipe(
      map(isAdmin => {
        if (isAdmin) {
          return true;
        } else {
          iziToast.error({
            title: 'Error',
            message: 'You don\'t have permission, contact you administrator',
            position: 'bottomCenter'
          });
          this.router.navigate(['/home']); 
          return false;
        }
      })
    );
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.canActivate(childRoute, state);
  }

}
