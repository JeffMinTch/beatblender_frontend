import { TestBed } from '@angular/core/testing';

import { SampleLicensingMarketService } from './sample-licensing-market.service';

describe('SampleLicensingMarketService', () => {
  let service: SampleLicensingMarketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SampleLicensingMarketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
