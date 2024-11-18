import { Component } from '@angular/core';
import { IRegisterUser } from '../../model/registered-user';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../services/user.service';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import iziToast from 'izitoast';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrl: './userdetails.component.scss'
})
export class UserdetailsComponent {
  user: IRegisterUser | undefined;
  users: IRegisterUser[] = [];
  errorMessage: string | null = null;
  userForm: FormGroup;

  constructor(private authSvc: AuthService,
    private userSvc: UserService,
    private fb: FormBuilder,
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }


  ngOnInit(): void {
    this.userSvc.user$.subscribe(users => {
      this.users = users;
    });
    this.loadUser();

  }



  getUser(id: number) {
    this.userSvc.getUserById(id).subscribe({
      next: (user) => {
        this.user = user;
        this.userForm.patchValue(user);
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
          this.userForm.patchValue(this.user);
          this.getUser(this.user.id);
        }
      },
      error: (err) => {
        this.errorMessage = 'Errore nel caricamento dell\'utente';
      }
    });
  }

  updateProfile() {
    if (this.userForm.valid && this.user) {
      const updatedUser = { ...this.user, ...this.userForm.value };
      this.userSvc.updateUser(this.user.id, updatedUser).subscribe({
        next: () => {
          console.log('Utente aggiornato con successo');
          iziToast.success({
            title: 'Success',
            message: 'Profile successfully updated.',
            position: 'bottomCenter'
          });
          setTimeout(() => {
            window.location.reload();;
          }, 2000);
        },
        error: (error) => {
          console.error('Errore durante l\'aggiornamento dell\'utente', error);
          this.errorMessage = 'Errore durante l\'aggiornamento dell\'utente';
        }
      });
    }
  }
}



