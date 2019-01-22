import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiFilesUploadComponent } from './multi-files-upload.component';

describe('MultiFilesUploadComponent', () => {
  let component: MultiFilesUploadComponent;
  let fixture: ComponentFixture<MultiFilesUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiFilesUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiFilesUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
