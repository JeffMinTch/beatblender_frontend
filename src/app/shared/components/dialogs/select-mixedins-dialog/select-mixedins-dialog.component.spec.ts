import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMixedinsDialogComponent } from './select-mixedins-dialog.component';

describe('SelectMixedinsDialogComponent', () => {
  let component: SelectMixedinsDialogComponent;
  let fixture: ComponentFixture<SelectMixedinsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectMixedinsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMixedinsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
