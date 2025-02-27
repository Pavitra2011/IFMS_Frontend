export class Task {
  taskId: number;
  taskName: string;
  description: string;
  sprintId:number;
  status: string;
  startDate: Date;
  endDate: Date;
  projectId: number;
  dateCreated: Date;
  dateModified: Date;

  constructor() {
    this.taskId = 0; // or appropriate default
    this.taskName = '';
    this.description = '';
    this.status = 'pending'; // or appropriate default
    this.startDate = new Date(); // or appropriate default
    this.endDate = new Date(); // or appropriate default
    this.projectId = 0; // or appropriate default
    this.sprintId=0;
    this.dateCreated = new Date(); // or appropriate default
    this.dateModified = new Date(); // or appropriate default
  }
}