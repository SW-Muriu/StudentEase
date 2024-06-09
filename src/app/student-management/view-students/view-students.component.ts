import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NotificationService } from '../../architecture/shared/services/notifications/notification.service';
import { MatSort } from '@angular/material/sort';
import { DataDestroyerComponent } from '../../architecture/shared/components/data-destroyer/data-destroyer.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { takeUntil } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { StudentsService } from '../services/student/students.service';
import { Router } from '@angular/router';
import { ManageStudentComponent } from '../manage-student/manage-student.component';

@Component({
  selector: 'app-view-students',
  standalone: true,
  imports: [
    MatTableModule, 
    MatIconModule,
    MatButtonModule, 
    ManageStudentComponent
  ],
  templateUrl: './view-students.component.html',
  styleUrl: './view-students.component.scss'
})
export class ViewStudentsComponent extends DataDestroyerComponent implements OnInit, AfterViewInit {

  //Member Variables
  ELEMENT_DATA = [
    {
      firstName: "Josh",
      secondName: "Kamau",
      admNumber: 3465,
    },
    {
      firstName: "Josh2",
      secondName: "Kiki",
      admNumber: 2343,
    },
    {
      firstName: "Josh2",
      secondName: "Kiki",
      admNumber: 2343,
    },
    {
      firstName: "Josh2",
      secondName: "Kiki",
      admNumber: 2343,
    },

  ];

  
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    "index",
    "firstName",
    "secondName",
    "admNumber",
    "action"
  ];


  constructor(
    private studentMgtService: StudentsService, 
    private notificationMgtService: NotificationService,
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router
  ) {
    super ()
  }
  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }


  //Methods
  onRowClick(row: any) {
    this.notificationMgtService
      .showNotificationMessage("Viewed Successfully", "snackbar-success");
  }

  //Sorting
  announceSortChange(sortState: any) {
    (sortState.direction) ? this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`) :
      this._liveAnnouncer.announce(`Sorting cleared`);
  }

  //Post A new Student
  postNewStudent(): void {
    this.router.navigate([''], {
      skipLocationChange: true
    }) //Insert Route Here
  }

  //Update a student
  updateStudent(studentDetails: any): void {
    this.router.navigate([], {
      queryParams: {
        id: studentDetails.id,
        data: studentDetails
      },
      skipLocationChange: true
    })
  }


  //Fetch Students
  getStudents(): void {
    this.studentMgtService.fetchStudents()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          (res.statusCode === 200) ? this.ELEMENT_DATA = res.entity :
            this.notificationMgtService.showNotificationMessage("Error in Fetching Students", 'snackbar-danger');
        },
        error: (err) => {
          this.notificationMgtService.showNotificationMessage("Server Error!!", 'snackbar-danger');
        }
      })
  }


  //Delete Student
  deleteStudent(studentDetails: any): void {
    const params = new HttpParams()
      .set("id", studentDetails.id)
    this.studentMgtService
      .deleteStudent(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          (res.statusCode === 200) ? this.notificationMgtService
            .showNotificationMessage(`${studentDetails.firstName} Deleted Successfully`, "snackbar-success") :
            this.notificationMgtService
              .showNotificationMessage(res.message, "snackbar-danger");
        },
        error: () => {
          this.notificationMgtService
            .showNotificationMessage("Server Error", "snackbar-danger");
        }
      })
  }


}
