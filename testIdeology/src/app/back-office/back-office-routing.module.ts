import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackOfficeComponent } from './back-office.component';
import { UserBackOfficeComponent } from './user-back-office/user-back-office.component';
import { ProjectBackOfficeComponent } from './project-back-office/project-back-office.component';
import { ClientBackOfficeComponent } from './client-back-office/client-back-office.component';
import { TasksBackOfficeComponent } from './tasks-back-office/tasks-back-office.component';
import { LogBackOfficeComponent } from './log-back-office/log-back-office.component';
import { ClientUpdateComponent } from './client-back-office/client-update/client-update.component';

const routes: Routes = [
  { path: '', component: BackOfficeComponent },
  {
    path:"user", component: UserBackOfficeComponent
  },
  {
    path:"projects", component: ProjectBackOfficeComponent
  },
  {
    path:"clients", component: ClientBackOfficeComponent
  },
  {
    path:"tasks", component: TasksBackOfficeComponent
  },
  {
    path:"log", component: LogBackOfficeComponent
  },
  {
    path: "updateClient", component: ClientUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackOfficeRoutingModule { }
