import { UserManagementDomain } from "../../model/UserManagementDomain";

export class Project {
  projectId:number;
  projectName:string;
  description:string;
  assignedTo:number;
  startDate:Date;
  endDate:Date;
  
  assignedUserIds: number[];
  assignedUserNames: string[];

constructor(
  projectId: number = 0,
  projectName: string = '',
  description: string = '',
  assignedTo: number = 0,
  startDate: Date = new Date(),
  endDate: Date = new Date(),
  assignedUserIds = [],
  assignedUserNames = []
) {
  this.projectId = projectId;
  this.projectName = projectName;
  this.description = description;
  this.assignedTo = assignedTo;
  this.startDate = startDate;
  this.endDate = endDate;
  this.assignedUserIds = assignedUserIds;
  this.assignedUserNames = assignedUserNames;
}
}