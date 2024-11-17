import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IRegisterUser } from '../model/registered-user';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { IClient } from '../model/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  
  userUrl = environment.clientUrl;
  constructor(private http: HttpClient, private authService : AuthService) { }

  private getAuthHeaders(): HttpHeaders{
    const token = this.authService.getAccessToken();
    console.log(token);
    if(!token) return new HttpHeaders();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  getAllClients(page: number, size: number): Observable<{ content: IClient[], totalPages: number, totalElements: number }> {
    return this.http.get<{ content: IClient[], totalPages: number, totalElements: number }>(
      `${this.userUrl}?page=${page}&size=${size}`,
      { headers: this.getAuthHeaders() }
    );
  }
  
  getClientById(id: number): Observable<IClient> {
    return this.http.get<IClient>(`${this.userUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  searchClientsByName(name: string): Observable<IClient[]> {
    return this.http.get<IClient[]>(`${this.userUrl}/search?name=${name}`, {
      headers: this.getAuthHeaders()
    });
  }

  
  addClient(client: Partial<IClient>): Observable<IClient> {
    return this.http.post<IClient>(this.userUrl, client, {
      headers: this.getAuthHeaders()
    });
  }

  
  updateClient(id: number, client: Partial<IClient>): Observable<IClient> {
    return this.http.put<IClient>(`${this.userUrl}/${id}`, client, {
      headers: this.getAuthHeaders()
    });
  }

  
  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.userUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
