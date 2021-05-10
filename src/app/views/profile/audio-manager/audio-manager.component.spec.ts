import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioManagerComponent } from './audio-manager.component';

describe('AudioManagerComponent', () => {
  let component: AudioManagerComponent;
  let fixture: ComponentFixture<AudioManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
