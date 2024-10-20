

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectManagementService } from '../services/project-management.service';
//import { SprintManagementService } from '../../sprint-management/services/sprint-management.service';
import { Task } from '../model/task.model';
import { TaskManagementService } from '../services/task-management.service';
//import {TaskManagementComponent} from '../task-management/task-management.component'
import { catchError } from 'rxjs/internal/operators/catchError';
import { Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css'],
})
export class ProjectManagementComponent implements OnInit {
//[x: string]: any;
  createProjectForm!: FormGroup;
  projects: any[] = [];
  tasks: any[] = [];
  //sprints: any[] = [];
  projectStatuses = ['ON_HOLD', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];
  selectedProject: any;
  selectedProjectId: number = 0;  // Hold the selected projectId
  errorMessage: string = '';
  isLoading: boolean = false;
  http: any;
  router: any;
  projectId: number=0; // Define projectId here
  
constructor(
  private fb: FormBuilder,
  private projectService: ProjectManagementService,
 // private sprintService: SprintManagementService, // Inject your sprint service
 private taskService: TaskManagementService
) {}
ngOnInit(): void {
  this.createProjectForm = this.fb.group({
    projectName: ['', Validators.required],
    assignedTo: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    //status: ['', Validators.required],
    description: [''],
    //sprintIds: [[], Validators.required],
  });
  
  this.getProjects();
  //this.fetchSprints();
}
onCreateProject() {
  console.log("inside onCreateProject");
  console.log(this.createProjectForm.valid);
  if (this.createProjectForm.valid) {
    console.log("isLoading:"+this.isLoading);
    this.isLoading = true;
    const projectData = this.createProjectForm.value;
    this.projectService.createProject(projectData).subscribe(
      (response) => {
        this.getProjects();  // Refresh the project list
        console.log("Fetched Projects:"+this.getProjects());
        this.createProjectForm.reset();
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      }
    );
  } else {
    this.errorMessage = 'Please fill in all required fields.';
  }
}
// Get all projects
getProjects() {
  this.isLoading = true;
  this.projectService.getProjects().subscribe(
    (data) => {
      this.projects = data;
      this.isLoading = false;
    },
    (error) => {
      this.errorMessage = error;
      this.isLoading = false;
    }
  );
}
selectProject(project: any) {
  this.selectedProject = project; // Set the selected project
  console.log('Selected Project:', this.selectedProject); // Check what project is selected
  this.projectService.getTasksByProject(project.projectId); // Load tasks for the selected project
}

loadTasks(projectId: number): Observable<Task[]> {
  return this.taskService.getTasks(projectId).pipe(
    tap((tasks: Task[]) => {
      console.log('Fetched tasks:', tasks); // Log the fetched tasks
      const project = this.projects.find(p => p.projectId === projectId);
      if (project) {
        project.tasks = tasks; // Assign tasks to the project
        console.log('Tasks assigned to project:', project.projectName);
      } else {
        console.warn(`Project with ID ${projectId} not found.`);
      }
    }),
    catchError((error) => {
      console.error('Error loading tasks:', error);
      return of([]); // Return an empty array if the request fails
    })
  );
}


viewTasks(project: any) {
  if (this.selectedProject === project) {
    // Deselect the project if already selected
    this.selectedProject = null;
  } else {
    // Set the selected project and ensure tasks are loaded
    this.selectedProject = project;

    // Optional: Fetch tasks dynamically if not already loaded
    if (!project.tasks) {
      project.isLoading = true;
      this.loadTasks(project.projectId).subscribe((tasks) => {
        project.tasks = tasks; // Assign tasks to the project
        project.isLoading = false;
      });
    }
  }
}
// Delete project
deleteProject(projectId: number) {
  this.isLoading = true;
  this.projectService.deleteProject(projectId).subscribe(
    (response) => {
      // On success, refresh the project list
      this.getProjects();
      this.isLoading = false;
    },
    (error) => {
      this.errorMessage = error;
      this.isLoading = false;
    }
  );
}

onTaskCreated(): void {
  this.viewTasks(this.selectedProject!);  // Reload tasks after creation
}

onTaskUpdated(): void {
  if (this.selectedProject) {
    this.taskService.getTasks(this.selectedProject.projectId).subscribe((tasks) => {
      this.selectedProject!.tasks = tasks;
    });
  }
}

onTaskDeleted(taskId: number): void {
  this.taskService.deleteTask(taskId).subscribe(() => {
    this.onTaskUpdated();  // Reload tasks after deletion
  });
}
}

