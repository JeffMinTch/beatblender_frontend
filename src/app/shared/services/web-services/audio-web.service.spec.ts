import { TestBed } from '@angular/core/testing';

import { AudioWebService } from './audio-web.service';

describe('AudioWebService', () => {
  let service: AudioWebService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioWebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
