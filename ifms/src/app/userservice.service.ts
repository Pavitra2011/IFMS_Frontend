import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserManagementDomain } from './model/UserManagementDomain';


@Injectable({
  providedIn: 'root'
})
 export class UserserviceService {

  // private apiUrl = 'assets/users.json';
  private apiUrl = 'http://localhost:8080/api/users'; 
  searchTerm:any ='';
  searchSubject = new Subject();

  constructor(private http: HttpClient) { }

     getUsers(): Observable<UserManagementDomain[]> {
      return this.http.get<UserManagementDomain[]>(this.apiUrl).pipe(
        catchError(this.errorHandler));
    }
    private errorHandler(error: HttpErrorResponse) {
      
      console.error('An error occurred:', error.message);
      return throwError(error.message || 'Server Error');
    }

    getSearchString(searchTerm:any){
      this.searchTerm = searchTerm;
      this.searchSubject.next(this.searchTerm);
    }
}
 // private apiUrl = 'http://localhost:8080/api/users/searchUserByName'; 

  // searchUsersByName(userName: string): Observable<UserManagementDomain[]> {
  //   return this.http.get<UserManagementDomain[]>(`${this.apiUrl}/search?userName=${userName}`);
  // }
//}
