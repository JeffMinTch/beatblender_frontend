import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSliderChange } from '@angular/material/slider';
import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-min-max-slider',
  templateUrl: './min-max-slider.component.html',
  styleUrls: ['./min-max-slider.component.scss']
})
export class MinMaxSliderComponent implements OnInit {

  @ViewChild('minSlider', { read: ElementRef}) minSlider: ElementRef; 
  @ViewChild('maxSlider', { read: ElementRef}) maxSlider: ElementRef; 


  sliderMinSubject$: Subject<any> = new Subject<boolean>();
  sliderMaxSubject$: Subject<any> = new Subject<boolean>();

  @Input() title: string;
  @Input() minMaxGroup: FormGroup;
  @Input() minValue: number;
  @Input() maxValue: number;

  @Output() controlGroupChange = new EventEmitter<FormGroup>();
  sliderFocused: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.sliderMinSubject$.pipe(debounceTime(2000)).subscribe(isFocused => {
      if(this.sliderFocused === isFocused) {
            this.controlGroupChange.emit(this.minMaxGroup);
            this.sliderFocused = false;
            this.minSlider.nativeElement.blur();
            this.cdr.detectChanges();
          }
    })

    this.sliderMaxSubject$.pipe(debounceTime(2000)).subscribe(isFocused => {
      if(this.sliderFocused === isFocused) {
            this.controlGroupChange.emit(this.minMaxGroup);
            this.sliderFocused = false;
            this.maxSlider.nativeElement.blur();
            this.cdr.detectChanges();
          }
    })

    
  }

  changeMinSlider(event: MatSliderChange): void {
    this.sliderFocused = true;
    this.getMinControl().setValue(event.value);
    this.sliderMinSubject$.next(true);
    // setTimeout(() => {
    //   if(this.sliderFocused === true) {
    //     this.controlGroupChange.emit(this.minMaxGroup);
    //     this.sliderFocused = false;
    //     this.minSlider.nativeElement.blur();
    //   }
    // }, 2000);
    // this.controlGroupChange.emit(this.minMaxGroup);
  }

  // changeMinSlider(event): void {
  //   console.log(event);
  //   // this.getMinControl().setValue(event);
  //   this.controlGroupChange.emit(this.minMaxGroup);
  // }
  changeMaxSlider(event: MatSliderChange): void {
    this.sliderFocused = true;
    console.log(event);
    this.getMaxControl().setValue(event.value);
    this.sliderMaxSubject$.next(true);

    // setTimeout(() => {
    //   if(this.sliderFocused === true) {
    //     this.controlGroupChange.emit(this.minMaxGroup);
    //     this.sliderFocused = false;
    //     this.cdr.detectChanges();
    //   }
    // }, 2000);
  }
  
  emitChange() {
    
    // this.sliderFocused = false;
    if(!this.sliderFocused) {
      
    } else {
      setTimeout(() => {
        this.sliderFocused = false;
        this.controlGroupChange.emit(this.minMaxGroup);
        // this.minSlider.nativeElement.blur();
            // this.maxSlider.nativeElement.blur();
      }, 500);
    }
    // alert("Unfocus SLider");
    
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
