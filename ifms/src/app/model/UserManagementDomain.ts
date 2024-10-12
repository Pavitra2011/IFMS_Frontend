// user-management-domain.model.ts
export interface UserManagementDomain {
    ID: number;
    Name: string;
    Role : string;
    Email: any;
    Phone: number;
    Actions: any;
    // Add other fields as necessary
  }