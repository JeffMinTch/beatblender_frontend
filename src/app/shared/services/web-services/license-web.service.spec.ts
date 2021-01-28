import { TestBed } from '@angular/core/testing';

import { LicenseWebService } from './license-web.service';

describe('LicenseWebService', () => {
  let service: LicenseWebService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LicenseWebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
