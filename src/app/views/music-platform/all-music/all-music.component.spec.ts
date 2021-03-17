import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMusicComponent } from './all-music.component';

describe('AllMusicComponent', () => {
  let component: AllMusicComponent;
  let fixture: ComponentFixture<AllMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
