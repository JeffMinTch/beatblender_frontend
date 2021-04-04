import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicPlatformComponent } from './music-platform.component';

describe('MusicPlatformComponent', () => {
  let component: MusicPlatformComponent;
  let fixture: ComponentFixture<MusicPlatformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicPlatformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
