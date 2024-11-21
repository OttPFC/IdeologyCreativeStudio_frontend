import { ChangeDetectorRef, Component } from '@angular/core';
import { IRegisterUser } from '../../model/registered-user';
import { IClient } from '../../model/client';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../services/user.service';
import { ClientService } from '../../services/client.service';
import iziToast from 'izitoast';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {
  user: IRegisterUser | undefined;
  users: IRegisterUser[] = [];
  client: IClient[] = [];
  errorMessage: string | null = null;
  isLoading: boolean = false;
  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  totalElements: number = 0;
  selectedClients: Set<number> = new Set<number>();

  constructor(
    private authSvc: AuthService,
    private userSvc: UserService,
    private clientSvc: ClientService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUser();
    this.getAllClients();
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

  getAllClients(): void {
    this.isLoading = true;
    this.clientSvc.getAllClients(this.currentPage, this.pageSize).subscribe({
      next: (client) => {
        this.client = client.content;
        this.totalPages = client.totalPages;
        this.totalElements = client.totalElements;
        this.cdRef.detectChanges();
      },
      error: (error) => {
        this.errorMessage = 'Errore nel recupero dei clienti';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  changePage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.getAllClients();
    }
  }

  toggleClientSelection(clientId: number): void {
    if (this.selectedClients.has(clientId)) {
      this.selectedClients.delete(clientId);
    } else {
      this.selectedClients.add(clientId);
    }
  }

  isClientSelected(clientId: number): boolean {
    return this.selectedClients.has(clientId);
  }

  toggleSelectAll(event: any): void {
    if (event.target.checked) {
      this.client.forEach(c => this.selectedClients.add(c.id));
    } else {
      this.selectedClients.clear();
    }
  }

  isAllSelected(): boolean {
    return this.client.length > 0 && this.selectedClients.size === this.client.length;
  }

  deleteSelectedClients(): void {
    const selectedIds = Array.from(this.selectedClients);
    if (selectedIds.length === 0) {
      iziToast.warning({
        title: 'Warning',
        message: 'No clients selected for deletion.',
        position: 'bottomCenter'
      });
      return; 
    }
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete them!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true; 
        this.clientSvc.deleteMultipleClients(selectedIds).subscribe({
          next: () => {
            iziToast.success({
              title: 'Success',
              message: 'Selected clients have been deleted.',
              position: 'bottomCenter'
            });
            this.selectedClients.clear(); 
            this.getAllClients(); 
          },
          error: (error) => {
            console.error('Error during deletion:', error);
            iziToast.error({
              title: 'Error',
              message: 'Failed to delete selected clients.',
              position: 'bottomCenter'
            });
          },
          complete: () => {
            this.isLoading = false; 
          }
        });
      }
    });
  }
  
}
