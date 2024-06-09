import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  baseUrl: string = ``;

  constructor(
    private _http: HttpClient
  ) { 
    
  }

  //Post Student

  postStudent(studentDetails: any): Observable<any>{
    const url = `${this.baseUrl}/post`;
    return this._http.post<any>(url, studentDetails);
  }

  //Fetch Students
  fetchStudents(): Observable<any>{
    const url = `${this.baseUrl}/getAllStudents`;
    return this._http.get<[]>(url);
  }

  //Update Student
  updateStudent(params: any): Observable<any>{
    const url = `${this.baseUrl}/updateStudent`;
    return this._http.put<any>(url, {}, { params: params });
  };


  //Delete Student
  deleteStudent(params: any): Observable<any>{
    const url = `${this.baseUrl}/deleteStudent`;
    return this._http.delete<any>(url, { params: params });
  }

  //Seatch Student 
  searchStudent(searchTerm: any): Observable<any>{
    const url = `${this.baseUrl}/searchStudents`;
    return this._http.get<any>(url, {params: searchTerm})
  }


 
}
