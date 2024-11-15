import { Injectable } from '@angular/core';
import { IRegisterUser } from '../model/registered-user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ILoginUser } from '../model/login-user';
import { environment } from '../../environments/environment.development';

type AccessData = {
  user: IRegisterUser,
  accessToken: string
  
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper: JwtHelperService = new JwtHelperService();
  userSubj = new BehaviorSubject<IRegisterUser | null>(null);
  user$ = this.userSubj.asObservable()
  
  isLoggedIn$ = this.user$.pipe(
    map(user => !!user),
    //tap(loggedIn => this.loggedIn = loggedIn) 
  );

  registerUrl: string = environment.registerUrl;
  loginUrl: string = environment.loginUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.restoreUser();
  }

  getUser(): Observable<IRegisterUser | null> {
    return this.user$;
  }
  
  login(loginData: ILoginUser): Observable<AccessData> {
    return this.http.post<AccessData>(this.loginUrl, loginData)
      .pipe(tap(data => {
        console.log("pre data");
        console.log(data);
        console.log("post data");

        if (data.user) {
          this.userSubj.next(data.user);
          console.log('User set in BehaviorSubject:', data.user);
          localStorage.setItem('accessData', JSON.stringify(data));
          this.autoLogout(data.accessToken);
        } else {
          console.error('No user data received');
        }
      }));
  }

  register(newUser: Partial<IRegisterUser>): Observable<AccessData> {
    return this.http.post<AccessData>(this.registerUrl, newUser);
  }

  logout() {
    this.userSubj.next(null);
    console.log('User logged out', this.userSubj);
    localStorage.removeItem('accessData');
    console.log('User logged out', localStorage);
    this.router.navigate(['/']);
  }

  getAccessToken(): string {
    const userJson = localStorage.getItem('accessData');
    if (!userJson) return '';
    const accessData: AccessData = JSON.parse(userJson);
    console.log(accessData)
    if (this.jwtHelper.isTokenExpired(accessData.accessToken)) return '';
    return accessData.accessToken;
  }

  autoLogout(jwt: string){
    const expirationDate = this.jwtHelper.getTokenExpirationDate(jwt);
    if (expirationDate) {
      const expiresInMs = expirationDate.getTime() - new Date().getTime();
      setTimeout(() => {
        this.logout();
      }, expiresInMs);
    }
  }
  

  restoreUser() {
    const userJson = localStorage.getItem('accessData');
    console.log('Restoring user from localStorage:', userJson);
    if (!userJson) {
      console.log('No accessData in localStorage');
      return;
    }
    const accessData: AccessData = JSON.parse(userJson);
    console.log('Parsed accessData:', accessData);
    if (accessData.accessToken && accessData.user) {
      if (!this.jwtHelper.isTokenExpired(accessData.accessToken)) {
        console.log('Valid token, restoring user:', accessData.user);
        this.userSubj.next(accessData.user);
        this.autoLogout(accessData.accessToken);
      } else {
        console.log('Token expired, clearing stored accessData');
        localStorage.removeItem('accessData');
      }
    } else {
      console.log('Invalid accessData in localStorage');
    }
  }

  isAdmin(): Observable<boolean> {
    return this.user$.pipe(
      map(user => user?.role === 'ADMIN') 
    );
  }
  
}
