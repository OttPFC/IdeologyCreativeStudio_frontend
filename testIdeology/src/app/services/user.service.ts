import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IRegisterUser } from '../model/register-user';
import { environment } from '../../environments/environment.development';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user = new BehaviorSubject<IRegisterUser[]>([]);
  user$ = this.user.asObservable();

  userUrl = environment.registerUrl;

  constructor(private http: HttpClient, private authService : AuthService) { }

  private getAuthHeaders(): HttpHeaders{
    const token = this.authService.getAccessToken();
    console.log(token);
    if(!token) return new HttpHeaders();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }


  getAllUsers(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.userUrl}?page=${page}&size=${size}`, { headers: this.getAuthHeaders() });
  }

  getUserById(id: number): Observable<IRegisterUser> {
    return this.http.get<IRegisterUser>(`${this.userUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  searchUsersByName(firstName: string): Observable<IRegisterUser[]> {
    return this.http.get<IRegisterUser[]>(`${this.userUrl}/search?firstName=${firstName}`, { headers: this.getAuthHeaders() });
  }


  updateUser(id: number, user: IRegisterUser): Observable<IRegisterUser> {
    return this.http.put<IRegisterUser>(`${this.userUrl}/${id}`, user, { headers: this.getAuthHeaders() });
  }

  addUserRole(id: number, role: string): Observable<IRegisterUser> {
    return this.http.patch<IRegisterUser>(`${this.userUrl}/${id}/add-role`, { role }, { headers: this.getAuthHeaders() });
  }

  removeUserRole(id: number, role: string): Observable<IRegisterUser> {
    return this.http.patch<IRegisterUser>(`${this.userUrl}/${id}/remove-role`, { role }, { headers: this.getAuthHeaders() });
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.userUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

}
