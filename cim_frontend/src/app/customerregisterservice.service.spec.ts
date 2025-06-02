import { TestBed } from '@angular/core/testing';

import { CustomerregisterserviceService } from './customerregisterservice.service';

describe('CustomerregisterserviceService', () => {
  let service: CustomerregisterserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerregisterserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
