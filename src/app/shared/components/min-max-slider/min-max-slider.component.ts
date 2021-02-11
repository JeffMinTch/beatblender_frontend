import { MatSliderChange } from '@angular/material/slider';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-min-max-slider',
  templateUrl: './min-max-slider.component.html',
  styleUrls: ['./min-max-slider.component.scss']
})
export class MinMaxSliderComponent implements OnInit {

  @Input() title: string;
  @Input() minMaxGroup: FormGroup;
  @Input() minValue: number;
  @Input() maxValue: number;

  @Output() controlGroupChange = new EventEmitter<FormGroup>();

  constructor() { }

  ngOnInit(): void {
  }

  changeMinSlider(event: MatSliderChange): void {
    this.getMinControl().setValue(event.value);
    this.controlGroupChange.emit(this.minMaxGroup);
  }

  // changeMinSlider(event): void {
  //   console.log(event);
  //   // this.getMinControl().setValue(event);
  //   this.controlGroupChange.emit(this.minMaxGroup);
  // }
  changeMaxSlider(event: MatSliderChange): void {
    console.log(event);
    this.getMaxControl().setValue(event.value);
    this.controlGroupChange.emit(this.minMaxGroup);
  }
  
  getMinControl(): FormControl {
    // return this.minMaxGroup.controls[Object.keys(this.minMaxGroup.controls)[0]] as FormControl;
    return this.minMaxGroup.controls['minControl'] as FormControl;
    
  }

  getMaxControl(): FormControl {
    //  return this.minMaxGroup.controls[Object.keys(this.minMaxGroup.controls)[1]] as FormControl;
     return this.minMaxGroup.controls['maxControl'] as FormControl;    
    }

}
