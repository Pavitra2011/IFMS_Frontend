
export class Sprint {
  sprintId: number;
  sprintName: string;
  projectId: number;
  startDate: string;
  endDate: string;
  sprintNo: number;
  //tasks?: Task[];

  constructor(
    sprintId: number,
    sprintName: string,
    projectId: number,
    startDate: string,
    endDate: string,
    sprintNo: number,
    //tasks?: Task[]
  ) {
    this.sprintId = sprintId;
    this.sprintName = sprintName;
    this.projectId = projectId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.sprintNo = sprintNo;
    //this.tasks = tasks || []; // Initialize with an empty array if not provided
  }
}