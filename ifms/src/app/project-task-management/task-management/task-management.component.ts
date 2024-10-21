import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { catchError, Observable, of } from 'rxjs';
import { TaskManagementService } from '../services/task-management.service';
import { Task } from '../model/task.model';

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.css']
})
export class TaskManagementComponent implements OnInit {
  @Input() projectId!: number;
  @Input() tasks: Task[] = [];
  @Output() taskCreated = new EventEmitter<Task>();
  @Output() taskUpdated = new EventEmitter<void>();
  @Output() taskDeleted = new EventEmitter<number>();

  createTaskForm: FormGroup;
  editTaskForm: FormGroup;
  selectedTask: Task | null = null;
  showEditModal: boolean = false;
  showCreateTaskForm: boolean = true;

  priorities = ['Low', 'Medium', 'High'];
  taskStatuses = ['Pending', 'In Progress', 'Completed'];

  constructor(
    private fb: FormBuilder, 
    private taskService: TaskManagementService,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {
    this.createTaskForm = this.fb.group({
      taskName: ['', Validators.required],
      description: [''],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      assignedToUserName: ['']
    });

    this.editTaskForm = this.fb.group({
      taskName: ['', Validators.required],
      description: [''],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      assignedToUserName: ['']
    });
  }

  ngOnInit(): void {
    this.showCreateTaskForm = true; // Ensure the form is shown by default
    this.loadTasksForProject(this.projectId).subscribe((tasks) => {
      this.tasks = tasks;
      
    });
  }

  loadTasksForProject(projectId: number): Observable<Task[]> {
    return this.taskService.getTasks(projectId).pipe(
      catchError((error) => {
        this.showMessage('Error loading tasks', 'Close');
        console.error('Error loading tasks:', error);
        return of([]);
      })
    );
  }

  onCreateTask() {
    console.log("IscreateTaskForm:"+this.createTaskForm.valid);
    if (this.createTaskForm.valid) {
      const newTask: Task = {
        ...this.createTaskForm.value,
        projectId: this.projectId,
        startDate: new Date(this.createTaskForm.value.startDate),
        endDate: new Date(this.createTaskForm.value.endDate)
      };

      this.taskService.createTask(newTask).subscribe(() => {
        this.tasks.push(newTask);
        this.createTaskForm.reset();
        this.taskCreated.emit(newTask);
        this.showMessage('Task created successfully!', 'Close');
      });
    }
  }

  editTask(task: Task) {
    this.selectedTask = task;
    this.showEditModal = true;
    this.editTaskForm.patchValue(task);
  }

  onEditTask() {
    if (this.selectedTask && this.editTaskForm.valid) {
      const updatedTask = {
        ...this.selectedTask,
        ...this.editTaskForm.value,
        startDate: new Date(this.editTaskForm.value.startDate),
        endDate: new Date(this.editTaskForm.value.endDate)
      };

      this.taskService.updateTask(updatedTask).subscribe(() => {
        const index = this.tasks.findIndex(task => task.taskId === updatedTask.taskId);
        this.tasks[index] = updatedTask;
        this.showEditModal = false;
        this.taskUpdated.emit();
        this.showMessage('Task updated successfully!', 'Close');
      });
    }
  }
/*/*
      this.tasks = this.tasks.filter(task => task.taskId !== taskId);
      this.taskDeleted.emit(taskId);
      this.showMessage('Task deleted successfully!', 'Close');
    });
    onDeleteTask(taskId: number) {
      this.taskService.deleteTask(taskId).subscribe(() => {
          // Optionally re-fetch the tasks after deletion
          console.log(this.loadTasksForProject(this.projectId));
          this.loadTasksForProject(this.projectId).subscribe((tasks) => {
              this.tasks = tasks;
              this.taskDeleted.emit(taskId);
              this.showMessage('Task deleted successfully!', 'Close');
          });
      }, (error) => {
          console.error('Error deleting task:', error);
          this.showMessage('Error deleting task', 'Close');
      });
}
      nDeleteTask(taskId: number) {
        this.taskService.deleteTask(taskId).subscribe(() => {
          // Remove the task from the local array
          this.tasks = this.tasks.filter(task => task.taskId !== taskId);
          
          // Emit the deletion event
          this.taskDeleted.emit(taskId);
          
          // Show a success message
          this.showMessage('Task deleted successfully!', 'Close');
        }, (error) => {
          console.error('Error deleting task:', error);
          this.showMessage('Error deleting task', 'Close');
        });
      }*/
      onDeleteTask(taskId: number) {
        this.taskService.deleteTask(taskId).subscribe(() => {
          // Remove the task from the local array
          this.tasks = this.tasks.filter(task => task.taskId !== taskId);
          
          // Emit the deletion event
          this.taskDeleted.emit(taskId);
          
          // Show a success message
          this.showMessage('Task deleted successfully!', 'Close');
        }, (error) => {
          console.error('Error deleting task:', error);
          this.showMessage('Error deleting task', 'Close');
        });
      }

  closeEditModal() {
    this.showEditModal = false;
    this.selectedTask = null;
  }

  toggleCreateTaskForm() {
    this.showCreateTaskForm = !this.showCreateTaskForm;
  }

  private showMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }
}
