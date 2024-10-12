/*import { Project } from './project.model';

describe('Project', () => {
  it('should create an instance', () => {
    expect(new Project()).toBeTruthy();
  });
});
*/

// project.model.spec.ts

import { Project, ProjectStatus } from './project.model';

describe('Project Model', () => {
  it('should create a project object with valid properties', () => {
    const project: Project = {
      projectId: 1,
      projectName: 'Test Project',
      description: 'This is a test project',
      assignedTo: 2,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      status: ProjectStatus.NOT_STARTED, // Using the enum value
    };

    expect(project).toBeTruthy();
    expect(project.projectId).toEqual(1);
    expect(project.projectName).toEqual('Test Project');
    expect(project.description).toEqual('This is a test project');
    expect(project.assignedTo).toEqual(2);
    expect(project.startDate).toEqual(new Date('2024-01-01'));
    expect(project.endDate).toEqual(new Date('2024-12-31'));
    expect(project.status).toEqual(ProjectStatus.NOT_STARTED);
  });

  it('should have valid ProjectStatus values', () => {
    expect(ProjectStatus.NOT_STARTED).toBe('NOT_STARTED');
    expect(ProjectStatus.IN_PROGRESS).toBe('IN_PROGRESS');
    expect(ProjectStatus.COMPLETED).toBe('COMPLETED');
    expect(ProjectStatus.ON_HOLD).toBe('ON_HOLD');
    expect(ProjectStatus.CANCELED).toBe('CANCELED');
  });
});