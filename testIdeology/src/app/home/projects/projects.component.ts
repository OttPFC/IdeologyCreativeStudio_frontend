import { Component } from '@angular/core';
import { IRegisterUser } from '../../model/registered-user';
import { IProject } from '../../model/project';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../services/user.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  user: IRegisterUser | undefined;
  users: IRegisterUser[] = [];
  project : IProject[] = [];
  errorMessage: string | null = null;

  constructor(private authSvc: AuthService,
    private userSvc: UserService,
    private projectSvc: ProjectService){}


    ngOnInit(): void {
      this.loadUser();
      this.getAllProjects(0, 100);
      console.log(this.project)
    }

    getUser(id: number) {
      this.userSvc.getUserById(id).subscribe({
        next: (user) => {
          this.user = user;
        },
        error: (error) => {
          this.errorMessage = 'Errore nel recupero dell\'utente';
        }
      });
    }

    loadUser() {
      this.authSvc.user$.subscribe({
        next: (user) => {
          this.user = user || undefined;
          if (this.user) {
            
            this.getUser(this.user.id);
          }
        },
        error: (err) => {
          this.errorMessage = 'Errore nel caricamento dell\'utente';
        }
      });
}

getAllProjects(page: number, pageSize: number){
  this.projectSvc.getAllProjects(page, pageSize).subscribe({
    next: (projects) => {
      console.log("Projects received: ", projects)
      this.project = projects;
      
    },
    error: (error) => {
      this.errorMessage = 'Errore nel recupero dei progetti';
    }
  });
}

getAllProjectsByAuthor(page: number, pageSize: number){
  this.projectSvc.getAllProjects(page, pageSize).subscribe({
    next: (projects) => {
      console.log("Projects received: ", projects)
      this.project = projects;
      this.users = projects.map(p => p.author).filter((user, index, self) =>
        self.indexOf(user) === index
      );
      
    },
    error: (error) => {
      this.errorMessage = 'Errore nel recupero dei progetti';
    }
  });
}
}