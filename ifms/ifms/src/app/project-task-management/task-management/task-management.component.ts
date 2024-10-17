/*import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrl: './task-management.component.css'
})

export class TaskManagementComponent implements OnInit {
  tasks = [
    { taskId: 1, description: 'Design homepage', status: 'Pending' },
    { id: 2, description: 'Fix bug #42', status: 'In Progress' }
  ];

  constructor() {}

  ngOnInit(): void {}
}
*/
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Task } from '../model/task.model';
import { TaskManagementService } from '../services/task-management.service';
 

@Component({
  selector: 'app-task-management',
  
 templateUrl: './task-management.component.html',
  styleUrl: './task-management.component.css'
})
export class TaskManagementComponent implements OnInit {
  newTask: Task = new Task(); // Creating an instance of TaskMgmt to be used in the form
  createTaskForm!: FormGroup;
  //taskForm: FormGroup;
  tasks: Task[] = [];
  projectId: number =0;
  
  constructor(
    private fb: FormBuilder,
    private taskService: TaskManagementService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.createTaskForm = this.fb.group({
      taskName: ['', Validators.required],
      description: [''],
      priority:['',Validators.required],
      projectId: [null, Validators.required],
      sprintId: [null, Validators.required], // Add sprintId control here
      status: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
     

    });
  }

  ngOnInit(): void {
   /* console.log("ProjectId:"" this.projectId);
    this.route.paramMap.subscribe(params => {
      const projectIdParam = params.get('projectId');
  
      if (projectIdParam !== null) { // Check for null explicitly
        //this.projectId = +projectIdParam; // Convert string to number
        this.loadTasks(); // Load tasks for the selected project
        console.log('Project ID:', this.projectId);
      } else {
        console.error('Project ID not found in route parameters');
        // Handle the case where projectId is not available, e.g., navigate away
      }
    });*/
  }

  loadTasks(): void {
    this.taskService.getTasks(this.projectId).subscribe((data) => {
      this.tasks = data;
    });
  }
 /*
  onCreateTask(): void {
    console.log("Inside create task form:");
    console.log(this.createTaskForm.valid);
    if (this.createTaskForm.valid) {
      const newTask = {
        ...this.createTaskForm.value,
        projectId: this.projectId, // Link the new task to the selected project
      };
      console.log("this.projectId:"+this.projectId);
      this.taskService.createTask(newTask).subscribe(
        () => {
          this.loadTasks(); // Reload tasks after creation
          this.createTaskForm.reset(); // Reset the form after successful task creation
        },
        (err) => {
          console.error('Error creating task', err);
        }
      );
    }
  }*/
    // Method to handle form submission and retrieve the projectId
  onCreateTask() {
    if (this.createTaskForm.valid) {
      const newTask = this.createTaskForm.value;
      console.log('Form Data:', newTask); // Logging entire form data

      const projectId = newTask.projectId; // Extracting projectId specifically
      console.log('Project ID:', projectId);

      this.taskService.createTask(newTask).subscribe(
        () => {
          this.loadTasks(); // Reload tasks after creation
          this.createTaskForm.reset(); // Reset the form after successful task creation
        },
        (err) => {
          console.error('Error creating task', err);
        }
      );
  }
  }
  
  onUpdateTask(task: Task): void {
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