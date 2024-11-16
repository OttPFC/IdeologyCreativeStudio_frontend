import { Component } from '@angular/core';
import { ILoginUser } from '../model/login-user';
import { IRegisterUser } from '../model/registered-user';
import { AuthService } from './auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import iziToast from 'izitoast';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  loginUser: ILoginUser = {
    username: '',
    password: ''
  };
  registerData: Partial<IRegisterUser> = {};


  constructor(
    private authSvc: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  login(): void {
    this.authSvc.login(this.loginUser).subscribe({
      next: (data) => {
        console.log(data);
        iziToast.success({
          title: 'Success',
          message: `Welcome ${data.user.firstName}`,
          position: 'bottomCenter'
        });
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000);
        console.log('Login successful');
      },
      error: (error) => {
        console.error('Login failed', error);
        iziToast.error({
          title: 'Error',
          message: 'Login failed. Please try again.',
          position: 'bottomCenter'
        });
      }
    });
  }

  register(): void {
    this.authSvc.register(this.registerData).subscribe({
      next: (data) => {
        iziToast.success({
          title: 'Success',
          message: 'Registration successful!',
          position: 'bottomRight'
        });
        setTimeout(() => {
          this.router.navigate(['/login', { login: true }]);
        }, 2000);
        console.log('Registration successful');
      },
      error: (error) => {
        console.error('Registration failed', error);
        iziToast.error({
          title: 'Error',
          message: 'Registration failed. Please try again.',
          position: 'bottomCenter'
        });
      }
    });
  }
}
