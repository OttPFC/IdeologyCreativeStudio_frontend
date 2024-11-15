import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { IProject } from '../model/project';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private project = new BehaviorSubject<IProject[]>([]);
  project$ = this.project.asObservable();
  projectUrl = environment.projectUrl; 

  constructor(private http: HttpClient, private authSvc: AuthService){}

  private getAuthHeaders(): HttpHeaders{
    const token = this.authSvc.getAccessToken();
    console.log(token);
    if(!token) return new HttpHeaders();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  addProject(project: IProject): Observable<IProject> {
  return this.http.post<IProject>(this.projectUrl, project, {headers: this.getAuthHeaders()})
  }

  getAllProjects(page: number, size: number): Observable<IProject[]> {
    return this.http.get<{ content: IProject[] }>(`${this.projectUrl}?page=${page}&size=${size}`, {headers:
      this.getAuthHeaders() })
      .pipe(map(response => response.content))
      
  }

  getProjectById(id: number): Observable<IProject> {
    return this.http.get<IProject>(`${this.projectUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  updateProject(project: IProject): Observable<IProject> {
    return this.http.put<IProject>(`${this.projectUrl}/${project.id}`, project, { headers: this.getAuthHeaders() });
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.projectUrl}/${id}`, { headers: this.getAuthHeaders() });
  }


}
