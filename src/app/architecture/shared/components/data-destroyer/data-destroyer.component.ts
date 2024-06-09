import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-data-destroyer',
  standalone: true,
  imports: [],
  templateUrl: './data-destroyer.component.html',
  styleUrl: './data-destroyer.component.scss'
})
export class DataDestroyerComponent implements OnDestroy{

  destroy$ = new Subject<boolean>();
  

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
