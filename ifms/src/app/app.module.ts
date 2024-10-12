import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
//import { MatErrorModule } from '@angular/material/core'; 
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { MainContentComponent } from './main-content/main-content.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { UserserviceService } from './userservice.service';
import { RegisterComponent } from './register/register.component';
import { SearchPipe } from './search.pipe';
import { PaginationComponent } from './pagination/pagination.component';
import { StudentComponent } from './student/student.component';
import { SSidepanelComponent } from './s-sidepanel/s-sidepanel.component';
import { SMaincontentComponent } from './s-maincontent/s-maincontent.component';
import { ProjectManagementComponent } from './project-management/components/project-management.component';
//import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    MainContentComponent,
    LoginComponent,
    RegisterComponent,
    SearchPipe,
    PaginationComponent,
    StudentComponent,
    SSidepanelComponent,
    SMaincontentComponent,
    ProjectManagementComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    MatIconModule,
    ReactiveFormsModule
    
  ],
  providers: [UserserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
