import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { ProjectsComponent } from './projects/projects.component';
import { TaskComponent } from './task/task.component';
import { ClientComponent } from './client/client.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    UserdetailsComponent,
    ProjectsComponent,
    TaskComponent,
    ClientComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
