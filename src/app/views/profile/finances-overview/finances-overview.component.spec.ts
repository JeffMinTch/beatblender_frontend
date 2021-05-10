import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancesOverviewComponent } from './finances-overview.component';

describe('FinancesOverviewComponent', () => {
  let component: FinancesOverviewComponent;
  let fixture: ComponentFixture<FinancesOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancesOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
