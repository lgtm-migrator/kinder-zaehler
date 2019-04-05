import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChildFormComponent } from './create-child-form.component';

describe('CreateChildFormComponent', () => {
  let component: CreateChildFormComponent;
  let fixture: ComponentFixture<CreateChildFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateChildFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateChildFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
