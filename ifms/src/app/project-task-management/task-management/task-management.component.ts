import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Task } from '../model/task.model'; // Make sure to create this model

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.css']
})
export class TaskManagementComponent implements OnInit {
  @Input() projectId!: number;
  @Input() tasks: Task[] = [];
  @Output() taskCreated = new EventEmitter<void>();
  @Output() taskUpdated = new EventEmitter<void>();
  @Output() taskDeleted = new EventEmitter<number>();

  createTaskForm: FormGroup;
  editTaskForm: FormGroup; // Remove | null from here
  selectedTask: Task | null = null;
  showEditModal = false;

  priorities = ['Low', 'Medium', 'High']; // Example priorities
  taskStatuses = ['Pending', 'In Progress', 'Completed']; // Example statuses

  constructor(private fb: FormBuilder) {
    this.createTaskForm = this.fb.group({
      taskName: [''],
      description: [''],
      priority: [''],
      status: [''],
      startDate: [''],
      endDate: [''],
      assignedToUserName: ['']
    });

     // Initialize editTaskForm as an empty FormGroup
     this.editTaskForm = this.fb.group({
      taskName: [''],
      description: [''],
      priority: [''],
      status: [''],
      startDate: [''],
      endDate: [''],
      assignedToUserName: ['']
    });
  }

  ngOnInit(): void {}

  onCreateTask() {
    const newTask: Task = {
      taskId: this.tasks.length + 1, // Generate a new ID for the task
      ...this.createTaskForm.value,
      startDate: new Date(this.createTaskForm.value.startDate),
      endDate: new Date(this.createTaskForm.value.endDate)
    };

    this.tasks.push(newTask);
    this.createTaskForm.reset();
    this.taskCreated.emit();
  }

  editTask(task: Task) {
    this.selectedTask = task;
    this.showEditModal = true; // Show the edit modal
    this.editTaskForm = this.fb.group({
      taskName: [task.taskName],
      description: [task.description],
      priority: [task.priority],
      status: [task.status],
      startDate: [task.startDate],
      endDate: [task.endDate],
      assignedToUserName: [task.assignedToUserName]
    });
  }

  onEditTask() {
    if (this.selectedTask && this.editTaskForm) {
      Object.assign(this.selectedTask, this.editTaskForm.value);
      this.selectedTask.startDate = new Date(this.editTaskForm.value.startDate);
      this.selectedTask.endDate = new Date(this.editTaskForm.value.endDate);
      this.showEditModal = false; // Close the modal
      this.taskUpdated.emit();
    }
  }

  onDeleteTask(taskId: number) {
    this.tasks = this.tasks.filter(task => task.taskId !== taskId);
    this.taskDeleted.emit(taskId);
  }

  closeEditModal() {
    this.showEditModal = false; // Close the edit modal
  }
}
