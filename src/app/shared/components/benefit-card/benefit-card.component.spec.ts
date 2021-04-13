import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitCardComponent } from './benefit-card.component';

describe('BenefitCardComponent', () => {
  let component: BenefitCardComponent;
  let fixture: ComponentFixture<BenefitCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenefitCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
