import { TestBed, inject } from '@angular/core/testing';

import { LocationService } from './location.service';
import { HttpClientModule } from '@angular/common/http';

describe('LocationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [LocationService]
    });
  });

  it('should be created', inject([LocationService], (service: LocationService) => {
    expect(service).toBeTruthy();
  }));
});
