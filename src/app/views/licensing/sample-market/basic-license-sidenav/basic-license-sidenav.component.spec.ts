import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicLicenseSidenavComponent } from './basic-license-sidenav.component';

describe('BasicLicenseSidenavComponent', () => {
  let component: BasicLicenseSidenavComponent;
  let fixture: ComponentFixture<BasicLicenseSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicLicenseSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicLicenseSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
