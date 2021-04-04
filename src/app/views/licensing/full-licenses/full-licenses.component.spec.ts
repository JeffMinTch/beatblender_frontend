import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullLicensesComponent } from './full-licenses.component';

describe('FullLicensesComponent', () => {
  let component: FullLicensesComponent;
  let fixture: ComponentFixture<FullLicensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullLicensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullLicensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
