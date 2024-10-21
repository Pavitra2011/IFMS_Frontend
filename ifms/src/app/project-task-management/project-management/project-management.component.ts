

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectManagementService } from '../services/project-management.service';
//import { SprintManagementService } from '../../sprint-management/services/sprint-management.service';
import { Task } from '../model/task.model';
import { TaskManagementService } from '../services/task-management.service';
//import {TaskManagementComponent} from '../task-management/task-management.component'
import { catchError } from 'rxjs/internal/operators/catchError';
import { Observable, of, tap } from 'rxjs';
import { UserManagementDomain } from '../../model/UserManagementDomain';
import { UserserviceService } from '../../userservice.service';
import { Project } from '../model/project.model';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css'],
})
export class ProjectManagementComponent implements OnInit {
//[x: string]: any;
  createProjectForm!: FormGroup;
  users: UserManagementDomain[] = [];
  selectedUserNames: string[] = []; // Array to hold selected user names
  projects: any[] = [];
  tasks: any[] = [];
  //sprints: any[] = [];
  assignedUserIds: any[] = [];
  assignedUserNames: any[] = [];
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
 private taskService: TaskManagementService,
 private userService: UserserviceService
) {}
ngOnInit(): void {
  this.createProjectForm = this.fb.group({
    projectName: ['', Validators.required],
    //assignedTo: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    //status: ['', Validators.required],
    assignedUserIds:[[]],

    description: [''],
    //sprintIds: [[], Validators.required],
  });
  
  this.getProjects();
  this.loadProjectManagers();
  // Subscribe to changes on assignedUserIds control
  // Subscribe to changes on assignedUserIds control
  this.createProjectForm.get('assignedUserIds')?.valueChanges.subscribe(selectedIds => {
  if (selectedIds) { // Ensure selectedIds is not null
      this.updateSelectedUserNames(selectedIds);
  } else {
      this.selectedUserNames = []; // Reset if selectedIds is null
  }
  }); 
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
/*
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
*/
getProjects() {
  this.isLoading = true;
  this.projectService.getProjects().subscribe(
    (projects: Project[]) => {
      console.log('Fetched Projects:', projects); // Verify project data here
      this.projects = projects.map((project: Project) => {
        // Map assigned user IDs to user names
        console.log("project.assignedUserIds:"+project.assignedUserIds);
        project.assignedUserNames = project.assignedUserIds
          .map((id: number) => this.users.find(user => user.userId === id)?.userName)
          .filter((name): name is string => Boolean(name)); // Type guard to keep only strings
        console.log("project.assignedUserNames:"+project.assignedUserNames);
        return project;
      });
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
// Update selected user names based on selected IDs
updateSelectedUserNames(selectedIds: number[]): void {
  console.log("SelectedIds:"+selectedIds);
  if (selectedIds) { // Check if selectedIds is defined
        this.selectedUserNames = this.users
            .filter(user => selectedIds.includes(user.userId))
            .map(user => `${user.userId} - ${user.userName}`);
    } else {
        this.selectedUserNames = []; // Reset if selectedIds is null or undefined
    }
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
onTaskCreated(newTask: Task): void {
  if (this.selectedProject) {
    // Check if tasks property exists
    if (!this.selectedProject.tasks) {
      this.selectedProject.tasks = [];
    }
    console.log('New Task Created:', newTask);
    // Add the new task to the tasks array
    this.selectedProject.tasks.push(newTask);
    this.viewTasks(this.selectedProject);  // Reload tasks after creation
  }
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

// Load project managers on component initialization
loadProjectManagers(): void {
  this.userService.getProjectManagers().subscribe(
    (data) => {
      this.users = data;
      console.log('Project Managers:', this.users);
    },
    (error) => {
      console.error('Error fetching project managers', error);
    }
  );
}
}

