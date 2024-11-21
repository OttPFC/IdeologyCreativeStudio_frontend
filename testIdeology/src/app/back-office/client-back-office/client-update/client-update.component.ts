import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { IClient } from '../../../model/client';
import iziToast from 'izitoast';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.scss']
})
export class ClientUpdateComponent implements OnInit {
  client: IClient | null = null;
  errorMessage: string | null = null;
  clientForm:FormGroup;

  constructor(
    private clientSvc: ClientService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.clientForm = this.fb.group({
      name: ['',Validators.required],
      email: ['',Validators.required],
      phone: ['',Validators.required],
      address: ['',Validators.required],
      note: ['']
    });
  }

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
        this.clientForm.patchValue(client);
        console.log('Client received:', client);
      },
      error: (err) => {
        this.errorMessage = `Failed to load client: ${err.message}`;
      }
    });
  }

  updateClient() {
    console.log('Update client')
    if (this.clientForm.valid && this.client) {
      const updatedClient = { ...this.client, ...this.clientForm.value };
      this.clientSvc.updateClient(this.client.id, updatedClient).subscribe({
        next: () => {
          console.log('Utente aggiornato con successo');
          iziToast.success({
            title: 'Success',
            message: 'Profile successfully updated.',
            position: 'bottomCenter'
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
        error: (error) => {
          console.error('Errore durante l\'aggiornamento dell\'utente', error);
          this.errorMessage = 'Errore durante l\'aggiornamento dell\'utente';
        }
      });
    }else{
      console.log(this.clientForm)
      console.log(this.client)
    }
  }
  

  deleteClient(): void {
    if (this.client) {
      this.clientSvc.deleteClient(this.client.id).subscribe({
        next: () => {
          console.log('Client deleted successfully');
          iziToast.success({
            title: 'Success',
            message: 'Client successfully deleted.',
            position: 'bottomCenter'
          });
          this.router.navigate(['/home/client']); 
        },
        error: (error) => {
          this.errorMessage = 'Errore durante la eliminazione del client';
          console.error('Errore durante la eliminazione del client', error);
        }
      });
    }
  }
  
}
