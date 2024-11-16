import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';


const routes: Routes = [
  { path: '', 
    loadChildren: () => import('./auth/auth.module')
    .then(m => m.AuthModule)
  
  }, 
    
  { path: 'home', 
    loadChildren: () => import('./home/home.module')
    .then(m => m.HomeModule), 
      canActivateChild:[AuthGuard],
  },
  { path: 'backOffice', 
    loadChildren: () => import('./back-office/back-office.module')
    .then(m => m.BackOfficeModule), 
    canActivateChild:[AdminGuard]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
