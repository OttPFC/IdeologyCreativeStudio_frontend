import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { ProjectsComponent } from './projects/projects.component';
import { TaskComponent } from './task/task.component';
import { ClientComponent } from './client/client.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path:"user", component:UserdetailsComponent},
  {path:"projects", component:ProjectsComponent},
  {path:"task", component: TaskComponent},
  {path:"client", component:ClientComponent}







];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
