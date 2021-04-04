import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendedLicensesComponent } from './extended-licenses.component';

describe('ExtendedLicensesComponent', () => {
  let component: ExtendedLicensesComponent;
  let fixture: ComponentFixture<ExtendedLicensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendedLicensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedLicensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
