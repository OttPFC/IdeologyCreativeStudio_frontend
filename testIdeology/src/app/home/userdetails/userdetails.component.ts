import { Component } from '@angular/core';
import { IRegisterUser } from '../../model/registered-user';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrl: './userdetails.component.scss'
})
export class UserdetailsComponent {
  user: IRegisterUser | undefined;
  users: IRegisterUser[] = [];
  errorMessage: string | null = null;
  constructor(private authSvc: AuthService,
    private userSvc: UserService,
    ){}


    ngOnInit(): void {
      this.loadUser();
      
    }

    getUser(id: number) {
      this.userSvc.getUserById(id).subscribe({
        next: (user) => {
          console.log(user)
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
}
