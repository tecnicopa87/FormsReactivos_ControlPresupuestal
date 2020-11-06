import { TestBed, inject } from '@angular/core/testing';

import { ErroresServiceService } from './errores-service.service';

describe('ErroresServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErroresServiceService]
    });
  });

  it('should be created', inject([ErroresServiceService], (service: ErroresServiceService) => {
    expect(service).toBeTruthy();
  }));
});
