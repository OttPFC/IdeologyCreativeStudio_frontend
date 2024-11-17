import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { IClient } from '../../../model/client';
import iziToast from 'izitoast';

@Component({
  selector: 'app-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.scss']
})
export class ClientUpdateComponent implements OnInit {
  client: IClient | null = null;
  errorMessage: string | null = null;

  constructor(
    private clientSvc: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const clientId = Number(params['id']);
      if (clientId) {
        this.getClient(clientId);
      }
    });
  }

  getClient(clientId: number): void {
    this.clientSvc.getClientById(clientId).subscribe({
      next: (client) => {
        this.client = client;
        console.log('Client received:', client);
      },
      error: (err) => {
        this.errorMessage = `Failed to load client: ${err.message}`;
      }
    });
  }

  updateClient(): void {
    if (this.client) {
      this.clientSvc.updateClient(this.client.id,this.client).subscribe({
        next: (updateClient) => {
          console.log('Client updated successfully', updateClient);
          iziToast.success({
            title: 'Success',
            message: 'Trip successfully updated.',
            position: 'bottomCenter'
          });
          setTimeout(() => {
            this.router.navigate(['/home/client']);
          }, 2000);
        },
        error: (error) => {
          this.errorMessage = 'Errore durante l\'aggiornamento del viaggio';
          console.error('Errore durante l\'aggiornamento del viaggio', error);
        }
      });
    }
  }

  deleteClient():void{
    if (this.client) {
      this.clientSvc.deleteClient(this.client.id).subscribe({
        next: (deleteClient) => {
          console.log('Client deleted successfully', deleteClient);
          iziToast.success({
            title: 'Success',
            message: 'Client successfully deleted.',
            position: 'bottomCenter'
          });
          setTimeout(() => {
            this.router.navigate(['/home/client']);
          }, 2000);
        },
        error: (error) => {
          this.errorMessage = 'Errore durante la eliminazione del client';
          console.error('Errore durante la eliminazione del client', error);
        }
      });
    }
  }
}
