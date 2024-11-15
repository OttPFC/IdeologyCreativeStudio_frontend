import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import iziToast from 'izitoast';
import { IRegisterUser } from '../../model/registered-user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  route: string = '';
  user: IRegisterUser | undefined;
  users: IRegisterUser[] = [];
  errorMessage: string | null = null;
  constructor(
    private authSvc: AuthService,
    private router: Router,
    private usrSvc: UserService
  ) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.route = this.router.url;
    });
    this.authSvc.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
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

  getUser(id: number) {
    this.usrSvc.getUserById(id).subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (error) => {
        this.errorMessage = 'Errore nel recupero dell\'utente';
      }
    });
  }
  logout(){
    this.authSvc.logout();
    iziToast.success({
      title: 'Logout',
      message: 'See you traveler',
      position: 'bottomCenter'
    });
    setTimeout(() => {
      this.router.navigate(['']);
    }, 1000);
  }
}
