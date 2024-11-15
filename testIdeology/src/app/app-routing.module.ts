import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path: '', 
    loadChildren: () => import('./auth/auth.module')
    .then(m => m.AuthModule)
  
  }, 
    
  { path: 'home', 
    loadChildren: () => import('./home/home.module')
    .then(m => m.HomeModule), 
      canActivateChild:[AuthGuard],
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
