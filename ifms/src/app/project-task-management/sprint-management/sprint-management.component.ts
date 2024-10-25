import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SprintManagementService } from '../services/sprint-management.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sprint-management',
  templateUrl: './sprint-management.component.html',
})
export class SprintManagementComponent implements OnInit {
  displayedColumns: string[] = ['sprintName', 'startDate', 'endDate', 'actions'];
  sprints: any[] = []; // Array to hold sprint data
  sprintForm!: FormGroup;
  editingSprint: boolean = false; // Flag to indicate if editing
  isDialogOpen: boolean = false; // Flag to control dialog visibility
  projectId: number; // Project ID passed from the parent component
  projectName: string; //Project Name

  constructor(
    private fb: FormBuilder,
    private sprintService: SprintManagementService,
    public dialogRef: MatDialogRef<SprintManagementComponent>,private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { projectId: number; projectName: string },
  ) {
    this.projectId = data.projectId; // Assign projectId from injected data
    this.projectName = data.projectName;
    this.initSprintForm(); // Initialize the form
  }

  ngOnInit() {
    this.loadSprints();
    console.log(this.sprints); // Check if the array is populated
  }

  initSprintForm(): void {
    this.sprintForm = this.fb.group({
      projectId: [this.projectId], // Add projectId to the form
      projectName: [this.data.projectName], // Add projectName to the form
      sprintName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      sprintNo: ['', Validators.required], // Add sprintNo to the form
    });
  }

  loadSprints(): void {
    this.sprintService.getSprintsByProject(this.projectId).subscribe(data => {
      this.sprints = data;
    });
  }
  startSprint(sprintId: number): void {
    // Logic to start a sprint
    console.log(`Starting sprint with ID: ${sprintId}`);
    this.snackBar.open('Sprint Started!', 'Close', { duration: 3000 });
  }
  
  openSprintDialog(sprint?: any): void {
    this.isDialogOpen = true; // Open the dialog
    this.editingSprint = !!sprint; // Set editing mode
    if (sprint) {
      // Populate the form with the sprint data for editing
      this.sprintForm.patchValue({
        sprintName: sprint.name,
        projectId: sprint.projectId,
        projectName: sprint.projectName,
        sprintNo: sprint.sprintNo,
        startDate: sprint.startDate,
        endDate: sprint.endDate,
      });
    } else {
      this.sprintForm.reset(); // Reset form for new sprint
    }
  }
    onSubmit(): void {
      if (this.sprintForm.valid) {
        const sprintData = {
          ...this.sprintForm.value,
          projectId: this.data.projectId,
        };
  
        if (this.editingSprint) {
          // Update existing sprint
          this.sprintService.updateSprint(sprintData).subscribe(
            (result) => {
              this.snackBar.open('Sprint updated successfully!', 'Close', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
              this.dialogRef.close(result); // Close the dialog with updated sprint data
            },
            (error) => {
              console.error('Update failed', error);
              this.snackBar.open('Failed to update sprint!', 'Close', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
            }
          );
        } else {
          // Create new sprint
          this.sprintService.createSprint(sprintData).subscribe(
            (result) => {
              this.snackBar.open('Sprint created successfully!', 'Close', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
              this.dialogRef.close(result); // Close the dialog with new sprint data
            },
            (error) => {
              console.error('Creation failed', error);
              this.snackBar.open('Failed to create sprint!', 'Close', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
            }
          );
        }
      } else {
        console.warn('Form is invalid');
        this.snackBar.open('Please fill all required fields!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    }

  deleteSprint(sprintId: number): void {
    this.sprintService.deleteSprint(sprintId).subscribe(() => {
      this.loadSprints(); // Reload sprints after deletion
    });
  }

  closeDialog(): void {
    this.isDialogOpen = false; // Close the dialog
    this.dialogRef.close(); // Close the dialog reference
  }
}
