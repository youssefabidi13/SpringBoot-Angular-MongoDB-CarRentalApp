import { TestBed } from '@angular/core/testing';

import { CarServiceService } from './car-service.service';

describe('CarServiceService', () => {
  let service: CarServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
