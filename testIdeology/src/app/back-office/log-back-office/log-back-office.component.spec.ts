import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogBackOfficeComponent } from './log-back-office.component';

describe('LogBackOfficeComponent', () => {
  let component: LogBackOfficeComponent;
  let fixture: ComponentFixture<LogBackOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogBackOfficeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogBackOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
