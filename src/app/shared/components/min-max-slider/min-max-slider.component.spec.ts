import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinMaxSliderComponent } from './min-max-slider.component';

describe('MinMaxSliderComponent', () => {
  let component: MinMaxSliderComponent;
  let fixture: ComponentFixture<MinMaxSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinMaxSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinMaxSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
