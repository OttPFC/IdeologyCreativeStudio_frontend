import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksBackOfficeComponent } from './tasks-back-office.component';

describe('TasksBackOfficeComponent', () => {
  let component: TasksBackOfficeComponent;
  let fixture: ComponentFixture<TasksBackOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TasksBackOfficeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TasksBackOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
