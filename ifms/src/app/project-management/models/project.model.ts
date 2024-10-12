export enum ProjectStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS  ',
  COMPLETED= 'COMPLETED',
  ON_HOLD = 'ON_HOLD',
  CANCELED = 'CANCELED',
  ACTIVE='ACTIVE'
}
export interface Project {
  projectId:number;
  projectName:string;
  description:string;
  assignedTo:number;
  startDate:Date;
  endDate:Date;
  status:ProjectStatus;
  sprintNo:number;

}

