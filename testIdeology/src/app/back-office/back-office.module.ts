import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackOfficeRoutingModule } from './back-office-routing.module';
import { BackOfficeComponent } from './back-office.component';
import { UserBackOfficeComponent } from './user-back-office/user-back-office.component';
import { ProjectBackOfficeComponent } from './project-back-office/project-back-office.component';
import { ClientBackOfficeComponent } from './client-back-office/client-back-office.component';
import { TasksBackOfficeComponent } from './tasks-back-office/tasks-back-office.component';
import { LogBackOfficeComponent } from './log-back-office/log-back-office.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientUpdateComponent } from './client-back-office/client-update/client-update.component';


@NgModule({
  declarations: [
    BackOfficeComponent,
    UserBackOfficeComponent,
    ProjectBackOfficeComponent,
    ClientBackOfficeComponent,
    TasksBackOfficeComponent,
    LogBackOfficeComponent,
    ClientUpdateComponent
  ],
  imports: [
    CommonModule,
    BackOfficeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BackOfficeModule { }
