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
  sprintIds:number[];
  sprintNames:string[];
  defaultSprint = {
    sprintId: 0,
    sprintName: 'Backlog Sprint',
    startDate: new Date(), // Set to current date
    endDate: new Date(new Date().setDate(new Date().getDate() + 14)), // 2 weeks from now
  };
  
constructor(
  projectId: number = 0,
  projectName: string = '',
  description: string = '',
  assignedTo: number = 0,
  startDate: Date = new Date(),
  endDate: Date = new Date(),
  assignedUserIds = [],
  assignedUserNames = [],
  sprintIds = [],
  sprintNames = []
) {
  this.projectId = projectId;
  this.projectName = projectName;
  this.description = description;
  this.assignedTo = assignedTo;
  this.startDate = startDate;
  this.endDate = endDate;
  this.assignedUserIds = assignedUserIds;
  this.assignedUserNames = assignedUserNames;
  this.sprintIds = sprintIds;
  this.sprintNames = sprintNames;
}

}