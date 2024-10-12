import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StudentComponent} from './student/student.component';
import { ProjectManagementComponent } from './project-management/components/project-management.component';

const routes: Routes = [
  { path:"", component:HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin-dashboard', component: HomeComponent },
  { path: 'project-management', component: ProjectManagementComponent},
  { path: 'student', component: StudentComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
