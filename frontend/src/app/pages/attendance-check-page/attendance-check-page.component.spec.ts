import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceCheckPageComponent } from './attendance-check-page.component';

describe('AttendanceCheckPageComponent', () => {
  let component: AttendanceCheckPageComponent;
  let fixture: ComponentFixture<AttendanceCheckPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceCheckPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceCheckPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
