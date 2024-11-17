import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { IRegisterUser } from '../../model/registered-user';
import iziToast from 'izitoast';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-back-office',
  templateUrl: './user-back-office.component.html',
  styleUrl: './user-back-office.component.scss'
})
export class UserBackOfficeComponent {
  registerData: Partial<IRegisterUser> = {};

  constructor(private authSvc: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ){}
  register(): void {
    this.authSvc.register(this.registerData).subscribe({
      next: (data) => {
        console.log(data);
        iziToast.success({
          title: 'Success',
          message: 'Registration successful!',
          position: 'bottomRight'
        });
        setTimeout(() => {
          this.router.navigate(['/home', { login: true }]);
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
