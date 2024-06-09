import { Routes } from '@angular/router';
import { ViewStudentsComponent } from './student-management/view-students/view-students.component';

export const routes: Routes = [
    {
        path: "",
        component: ViewStudentsComponent,
        children: [{
            path: '',
            redirectTo: "#", pathMatch: "full"
        }]
    },
    {
        path: "#",
        component: ViewStudentsComponent,
    }
];
