import { TestBed } from '@angular/core/testing';

import { MediaWebService } from './media-web.service';

describe('MediaWebService', () => {
  let service: MediaWebService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaWebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
