import { TestBed } from '@angular/core/testing';

import { PlayStateControlService } from './play-state-control.service';

describe('PlayStateControlService', () => {
  let service: PlayStateControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayStateControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
