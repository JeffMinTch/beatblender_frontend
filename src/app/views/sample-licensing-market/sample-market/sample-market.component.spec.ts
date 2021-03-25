import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleMarketComponent } from './sample-market.component';

describe('SampleMarketComponent', () => {
  let component: SampleMarketComponent;
  let fixture: ComponentFixture<SampleMarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleMarketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
