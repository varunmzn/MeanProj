import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssessComponent } from './create-assess.component';

describe('CreateAssessComponent', () => {
  let component: CreateAssessComponent;
  let fixture: ComponentFixture<CreateAssessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAssessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAssessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
