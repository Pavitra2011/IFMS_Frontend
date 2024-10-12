import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskMgmtService } from './services/task-mgmt.service';
import { TaskMgmt } from './models/task-mgmt.model';

@Component({
  selector: 'app-task-mgmt',
  templateUrl: './task-mgmt.component.html',
  styleUrls: ['./task-mgmt.component.css']
})
export class TaskMgmtComponent implements OnInit {
  newTask: TaskMgmt = new TaskMgmt(); // Creating an instance of TaskMgmt to be used in the form

  taskForm: FormGroup;
  tasks: TaskMgmt[] = [];
  projectId: number =0;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskMgmtService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      taskName: ['', Validators.required],
      description: [''],
      status: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      projectId : [0]// default value

    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const projectIdParam = params.get('projectId');
  
      if (projectIdParam !== null) { // Check for null explicitly
        this.projectId = +projectIdParam; // Convert string to number
        this.loadTasks(); // Load tasks for the selected project
        console.log('Project ID:', this.projectId);
      } else {
        console.error('Project ID not found in route parameters');
        // Handle the case where projectId is not available, e.g., navigate away
      }
    });
  }

  loadTasks(): void {
    this.taskService.getTasksByProject(this.projectId).subscribe((data) => {
      this.tasks = data;
    });
  }

  onCreateTask(): void {
    if (this.taskForm.valid) {
      const newTask = {
        ...this.taskForm.value,
        projectId: this.projectId, // Link the new task to the selected project
      };

      this.taskService.createTask(newTask).subscribe(
        () => {
          this.loadTasks(); // Reload tasks after creation
          this.taskForm.reset(); // Reset the form after successful task creation
        },
        (err) => {
          console.error('Error creating task', err);
        }
      );
    }
  }

  onUpdateTask(task: TaskMgmt): void {
    this.taskService.updateTask(task).subscribe(
      () => {
        this.loadTasks(); // Reload tasks after updating
      },
      (err) => {
        console.error('Error updating task', err);
      }
    );
  }

  onDeleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(
      () => {
        this.loadTasks(); // Reload tasks after deletion
      },
      (err) => {
        console.error('Error deleting task', err);
      }
    );
  }

  backToProjects(): void {
    this.router.navigate(['/project-management']);
  }
}