import { Component } from '@angular/core';
import { StudentsService } from '../services/student/students.service';
import { NotificationService } from '../../architecture/shared/services/notifications/notification.service';
import { DataDestroyerComponent } from '../../architecture/shared/components/data-destroyer/data-destroyer.component';
import { takeUntil } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatCardModule} from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-manage-student',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule, 
    CommonModule
  ],
  templateUrl: './manage-student.component.html',
  styleUrl: './manage-student.component.scss'
})
export class ManageStudentComponent extends DataDestroyerComponent {

  studentData: any;
  studentForm!: FormGroup
  pageFunction: string = "Add";

  constructor(
    private studentMgtService: StudentsService,
    private notificationMgtService: NotificationService,
    private location: Location,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    super()
  }


  ngOnInit(): void {
    if (this.route.queryParams) {
      this.route.queryParams.subscribe({
        next: (params) => {
          if (params.hasOwnProperty('id')) {
            console.log("Params", params);
            (params['action'] === 'Add') ? this.pageFunction = 'Add' :
              this.pageFunction = 'Update';
            this.studentData = params['data'];
          }
        }
      });
    }
    this.getPage();
  }

  getPage() {
    switch (this.pageFunction) {
      case "Update":
        this.studentForm = this.fb.group({
          firstName: [this.studentData.firstName, [Validators.required]],
          secondName: [this.studentData.secondName, [Validators.required]],
          admNumber: [this.studentData.admNumber, [Validators.required]],
        });
        break;
      default:
        this.studentForm = this.fb.group({
          firstName: ['', [Validators.required]],
          secondName: ['', [Validators.required]],
          admNumber: [[Validators.required]],
        });
        break;
    }
  }


  onSubmit(pageFunction: string): void {
    switch (pageFunction) {
      case ("Update"):
        this.updateStudent(this.studentForm.value);
        break;
      default:
        this.postStudent(this.studentForm.value);
        break;
    }
  }


  //Post a new student
  postStudent(studentDetails: any): void {
    //Add the input field here
    this.studentMgtService
      .updateStudent(studentDetails)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res.statusCode === 200) {
            this.notificationMgtService
              .showNotificationMessage(`${studentDetails.firstName} Updated Successfully`, "snackbar-success");
            this.location.back();
          } else {
            this.notificationMgtService
              .showNotificationMessage(res.message, "snackbar-danger");
          }
        },
        error: () => {
          this.notificationMgtService
            .showNotificationMessage("Server Error", "snackbar-danger");
        },
        complete: () => {

        }
      })
  }

  //Update a student
  updateStudent(studentDetails: any): void {
    const params = new HttpParams()
      .set("id", studentDetails.id)
    this.studentMgtService
      .updateStudent(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res.statusCode === 200) {
            this.notificationMgtService
              .showNotificationMessage(`${studentDetails.firstName} Updated Successfully`, "snackbar-success");
            this.location.back();
          } else {
            this.notificationMgtService
              .showNotificationMessage(res.message, "snackbar-danger");
          }
        },
        error: () => {
          this.notificationMgtService
            .showNotificationMessage("Server Error", "snackbar-danger");
        },
        complete: () => { }
      })
  }

  //Navigate Back
  onCancel(): void {
    this.location.back();
  }





}
