import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicLicensesComponent } from './basic-licenses.component';

describe('BasicLicensesComponent', () => {
  let component: BasicLicensesComponent;
  let fixture: ComponentFixture<BasicLicensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicLicensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicLicensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
