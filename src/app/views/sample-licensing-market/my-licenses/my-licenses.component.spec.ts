import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLicensesComponent } from './my-licenses.component';

describe('MyLicensesComponent', () => {
  let component: MyLicensesComponent;
  let fixture: ComponentFixture<MyLicensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyLicensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyLicensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
