import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDestroyerComponent } from './data-destroyer.component';

describe('DataDestroyerComponent', () => {
  let component: DataDestroyerComponent;
  let fixture: ComponentFixture<DataDestroyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataDestroyerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataDestroyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
