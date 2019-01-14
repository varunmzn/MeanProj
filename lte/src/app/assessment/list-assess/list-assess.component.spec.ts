import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAssessComponent } from './list-assess.component';

describe('ListAssessComponent', () => {
  let component: ListAssessComponent;
  let fixture: ComponentFixture<ListAssessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAssessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAssessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
