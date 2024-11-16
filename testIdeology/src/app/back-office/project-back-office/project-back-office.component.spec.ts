import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBackOfficeComponent } from './project-back-office.component';

describe('ProjectBackOfficeComponent', () => {
  let component: ProjectBackOfficeComponent;
  let fixture: ComponentFixture<ProjectBackOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectBackOfficeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectBackOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
