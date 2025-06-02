import { TestBed } from '@angular/core/testing';

import { CustomerregistrationService } from './customerregistration.service';

describe('CustomerregistrationService', () => {
  let service: CustomerregistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerregistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
