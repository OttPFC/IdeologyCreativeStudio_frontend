import { Component } from '@angular/core';
import { IProject } from '../../model/project';
import { ProjectService } from '../../services/project.service';
import { UserService } from '../../services/user.service';  
import iziToast from 'izitoast';
import { Router } from '@angular/router';
import { IRegisterUser } from '../../model/registered-user';

@Component({
  selector: 'app-project-back-office',
  templateUrl: './project-back-office.component.html',
  styleUrls: ['./project-back-office.component.scss']
})
export class ProjectBackOfficeComponent {

  newProject: IProject = {
    id: 0,
    title: '',
    description: '',
    createDate: new Date().toISOString(),
    startDate: '',
    endDate: '',
    status: 'IN_PROGRESS',
    author: {
      id: 1,
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@domain.com',
      username: 'admin',
      role: 'ADMIN',
      roles: [],
      enabled: true
    },
    users: []
  };

  newProject2: Partial<IProject> = {}
  errorMessage: string | null = null;

  availableUsers: { id: number, firstName: string, lastName: string, selected: boolean }[] = [];

  constructor(private projectService: ProjectService, private userService: UserService, private router: Router) {
    this.loadUsers();
  }

  loadUsers(): void {
    const page = 0;
    const size = 10;
  
    this.userService.getAllUsers(page, size).subscribe({
      next: (response: { content: IRegisterUser[] }) => {  
        console.log(response.content);
        this.availableUsers = response.content.map(user => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          selected: false
        }));
      },
      error: (error) => {
        console.error('Error loading users', error);
      }
    });
  }
  addProject(): void {
    this.newProject.users = this.availableUsers.filter(user => user.selected).map(user => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: '',  
      username: '',  
      role: 'USER',  
      roles: [],
      enabled: true
    }));
console.log(this.newProject)
    this.projectService.addProject(this.newProject).subscribe({
      next: (project) => {
        console.log(project);
        iziToast.success({
          title: 'Success',
          message: 'Project created successfully!',
          position: 'bottomRight'
        });
        setTimeout(() => {
          this.router.navigate(['/home', { login: true }]);
        }, 2000);
        console.log('Project created successfully');
      },
      error: (error) => {
        console.error('Project creation failed', error);
        iziToast.error({
          title: 'Error',
          message: 'Project creation failed. Please try again.',
          position: 'bottomCenter'
        });
      }
    });
  }

  createProject():void{
    this.projectService.addProject(this.newProject2 as IProject).subscribe({
      next: (result) => {
        console.log('Project created successfully', result);
        const selectedUsers = this.availableUsers.filter(user => user.selected);

      if (selectedUsers.length > 0) {
        this.addUsersToProject(result.id, selectedUsers);
      } else {
        console.log('No users selected to add to the project.');
      }
        this.newProject2 = {} as Partial<IProject>;
        
        iziToast.success({
          title: 'Success',
          message: 'Project created successfully!',
          position: 'bottomRight'
        });
      }
    });
  }

  addUsersToProject(projectId: number, selectedUsers: { id: number; firstName: string; lastName: string }[]): void {
    selectedUsers.forEach(user => {
      this.projectService.addUserToProject(projectId, user.id).subscribe({
        next: () => {
          console.log(`User ${user.firstName} added to project ${projectId}`);
          iziToast.success({
            title: 'Success',
            message: `User ${user.firstName} added to the project!`,
            position: 'bottomRight'
          });
        },
        error: (error) => {
          console.error(`Failed to add user ${user.firstName} to project`, error);
          iziToast.error({
            title: 'Error',
            message: `Failed to add user ${user.firstName} to the project.`,
            position: 'bottomCenter'
          });
        }
      });
    });
  }
  
  }


