import { TestBed, inject } from '@angular/core/testing';

import { MultifilesService } from './multifiles.service';

describe('MultifilesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MultifilesService]
    });
  });

  it('should be created', inject([MultifilesService], (service: MultifilesService) => {
    expect(service).toBeTruthy();
  }));
});
