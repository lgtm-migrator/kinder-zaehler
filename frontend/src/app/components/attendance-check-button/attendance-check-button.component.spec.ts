import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceCheckButtonComponent } from './attendance-check-button.component';

describe('AttendanceCheckButtonComponent', () => {
  let component: AttendanceCheckButtonComponent;
  let fixture: ComponentFixture<AttendanceCheckButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceCheckButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceCheckButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
