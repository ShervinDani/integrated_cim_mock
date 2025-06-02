import { TestBed } from '@angular/core/testing';

import { PlanretriveService } from './planretrive.service';

describe('PlanretriveService', () => {
  let service: PlanretriveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanretriveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
