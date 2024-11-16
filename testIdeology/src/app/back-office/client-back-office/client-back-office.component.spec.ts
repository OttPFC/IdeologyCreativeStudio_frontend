import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBackOfficeComponent } from './client-back-office.component';

describe('ClientBackOfficeComponent', () => {
  let component: ClientBackOfficeComponent;
  let fixture: ComponentFixture<ClientBackOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientBackOfficeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientBackOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
