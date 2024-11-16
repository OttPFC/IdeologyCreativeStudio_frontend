import { ChangeDetectorRef, Component } from '@angular/core';
import { IRegisterUser } from '../../model/registered-user';
import { IClient } from '../../model/client';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../services/user.service';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {

user: IRegisterUser | undefined;
  users: IRegisterUser[] = [];
  client : IClient[] = [];
  errorMessage: string | null = null;

  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  totalElements: number = 0;

  constructor(private authSvc: AuthService,
    private userSvc: UserService,
    private clientSvc: ClientService,
    private cdRef: ChangeDetectorRef){}

    ngOnInit(): void {
      this.loadUser();
      this.getAllClients();
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

getAllClients():void{
  this.clientSvc.getAllClients(this.currentPage,this.pageSize).subscribe({
    next: (client) => {
      console.log(client)
      
      this.client = client.content; 
      this.totalPages = client.totalPages; 
      this.totalElements = client.totalElements;
      console.log('Client data updated:', this.client);
      console.log('Total Pages:', this.totalPages);
      this.cdRef.detectChanges();
    },
    error: (error) => {
      this.errorMessage = 'Errore nel recupero dei clienti';
    }
  });

}

changePage(page: number): void {
  if (page >= 0 && page < this.totalPages) {
    this.currentPage = page;
    console.log('Pagina cambiata a:', this.currentPage);
    this.getAllClients();
  }
}
}
