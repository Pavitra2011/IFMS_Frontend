import { Component, OnInit} from '@angular/core';
import { UserManagementDomain } from '../model/UserManagementDomain';
import { UserserviceService } from '../userservice.service';
import { MatPaginator } from '@angular/material/paginator';

 @Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent implements OnInit{
  users: any[] = [];
  paginatedData: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'role', 'email', 'phone', 'actions'];
  searchTerm: string = '';
  pageIndex: number = 0;
  pageSize: number = 2; 
  length: number = 0;

  constructor(private userService: UserserviceService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      console.log(data);  // Log the data to see its structure
      this.users = data;
      this.length = this.users.length;
      this.updatePaginatedData();
    });
  }

  filterUsers(): void {
    this.pageIndex = 0;
    this.updatePaginatedData();
  }

  updatePaginatedData(): void {
    const filteredUsers = this.users.filter(user =>
      user.userName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.mailId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.phone.includes(this.searchTerm)
    );
    const startIndex = this.pageIndex * this.pageSize;
    this.paginatedData = filteredUsers.slice(startIndex, startIndex + this.pageSize);
    // this.paginatedData = filteredUsers.slice(this.pageIndex * 2, (this.pageIndex + 1) * 2);
  }

  onPaginateChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.updatePaginatedData();
  }

  addNewUser(): void {
    // Logic for adding a new user
  }

  viewUser(user: UserManagementDomain): void {
    // Logic for viewing user details
  }

  editUser(user: UserManagementDomain): void {
    // Logic for editing user details
  }

  deactivateUser(user: UserManagementDomain): void {
    // Logic for deactivating a user
  }
}

