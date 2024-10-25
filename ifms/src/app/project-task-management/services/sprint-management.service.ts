// sprint.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sprint } from '../model/sprint.model';

@Injectable({
  providedIn: 'root'
})
export class SprintManagementService {
  private apiUrl = 'http://localhost:8080/api/sprints'; // Adjust as needed

  constructor(private http: HttpClient) {}

  getSprintsByProject(projectId: number): Observable<Sprint[]> {
    return this.http.get<Sprint[]>(`${this.apiUrl}/project/${projectId}`);
  }

  createSprint(sprint: Sprint): Observable<Sprint> {
    return this.http.post<Sprint>(this.apiUrl, sprint);
  }

  updateSprint(sprint: Sprint): Observable<Sprint> {
    return this.http.put<Sprint>(`${this.apiUrl}/${sprint.sprintId}`, sprint);
  }

  deleteSprint(sprintId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${sprintId}`);
  }
}
