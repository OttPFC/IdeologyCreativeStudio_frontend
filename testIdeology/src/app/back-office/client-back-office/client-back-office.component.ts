import { Component } from '@angular/core';
import { IClient } from '../../model/client';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import iziToast from 'izitoast';

@Component({
  selector: 'app-client-back-office',
  templateUrl: './client-back-office.component.html',
  styleUrl: './client-back-office.component.scss'
})
export class ClientBackOfficeComponent {

  newClient: Partial<IClient> = {};
  errorMessage: string | null = null;

  constructor(private authSvc: AuthService,
    private clientSvc: ClientService,
    private router: Router
  ){}

  createClient(): void {
    
    this.clientSvc.addClient(this.newClient).subscribe({
      next: (data) => {
        console.log(data);
        iziToast.success({
          title: 'Success',
          message: 'Project created successfully!',
          position: 'bottomRight'
        });
        setTimeout(() => {
          this.router.navigate(['/home/client', { login: true }]);
        }, 2000);
        console.log('Client created successfully');
      },
      error: (error) => {
        console.error('Project creation failed', error);
        iziToast.error({
          title: 'Error',
          message: 'Client creation failed. Please try again.',
          position: 'bottomCenter'
        });
      }
    });
  }
}
