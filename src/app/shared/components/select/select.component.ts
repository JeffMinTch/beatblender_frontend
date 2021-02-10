import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatOption, MatOptionSelectionChange } from '@angular/material/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @ViewChild('allSelected', { read: MatOption}) allSelected: MatOption;  
  
  @Output() formControlChange = new EventEmitter<FormControl>();

  @Input() label: string;
  @Input() selectionList: Array<any>;
  @Input() control: FormControl;
  @Input() placeHolder: string;
  
  constructor() { }

  ngOnInit(): void {
    
  }

  public selectionChange(selectionChange: MatSelectChange):void {
    setTimeout(() => {
      console.log(selectionChange.value);

    });
    
  }

  public onSelectionChange(optionSelectionChange: MatOptionSelectionChange):void {
    if(optionSelectionChange.isUserInput) {
      console.log(optionSelectionChange.source.selected);
    }
  }

  tosslePerOne(all) {
    console.log('All');
    console.log(all);
    if (this.allSelected.selected) {
      this.allSelected.deselect();
      // return false;
      this.formControlChange.emit(this.control);

    }
    if (this.control.value.length == this.selectionList.length)
      this.allSelected.select();
      this.formControlChange.emit(this.control);
    console.log(this.control);
  }

  toggleAllSelection() {
    if (this.allSelected.selected) {
      this.control
      .patchValue([...this.selectionList.map(item => item), 0]);
      // this.control.setValue(this.selectionList);
    } else {
      // this.control.setValue([]);
      this.control
      .patchValue([]);
    }
    this.formControlChange.emit(this.control);
  }



}
