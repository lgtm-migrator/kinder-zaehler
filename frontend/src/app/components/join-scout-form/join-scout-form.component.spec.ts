import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinScoutFormComponent } from './join-scout-form.component';

describe('JoinScoutFormComponent', () => {
  let component: JoinScoutFormComponent;
  let fixture: ComponentFixture<JoinScoutFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinScoutFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinScoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
