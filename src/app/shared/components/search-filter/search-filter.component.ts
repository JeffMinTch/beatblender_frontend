import { SearchFilterFormMap } from './../../models/search-filter-form-map.model';
import { MinMaxSlider } from './../../models/min-max-slider.model';
import { Selection } from './../../models/selection.model';
import { AbstractControl } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {



  @Input() isFilterOpen: boolean;
  // @Input() selectionFormMap: Map<FormControl, Selection>;
  // @Input() minMaxSliderFormMap: Map<FormControl, MinMaxSlider>;
  @Input() searchFilterFormMap: SearchFilterFormMap;
  // @Input() filterForm: FormGroup;
  @Input() selections: Array<Selection>;
  // @Output() filterFormChange = new EventEmitter<Map<FormControl, Selection>>();
  @Output() filterFormChange = new EventEmitter<SearchFilterFormMap>();

  constructor(
    // private fb: FormBuilder, 
    // private sampleLicensingMarketService: SampleLicensingMarketService
    ) {
    // this.formGroup = this.buildForm();
  }

  ngOnInit(): void {
    // this.sampleLicensingMarketService.getCategories().subscribe((categoryList: Array<string>) => {
    //   this.categoryList = categoryList;
    // });
  }

  // public buildForm(): FormGroup {
  //   return this.fb.group({
  //     'categories': ['', []],
  //     'genres': ['', []],
  //     'moods': ['', []],
  //     'tempo': this.fb.group({
  //       'minTempo': [1, []],
  //       'maxTempo': [300, []],
  //     }),
  //     'lep': this.fb.group({
  //       'minLep': [1, []],
  //       'maxLep': [100, []]
  //     }),
  //   });
  // }

  // onMoodRemoved(mood: string): void {
  //   ;
  //   const selectedMoods: string[] = this.filterForm.controls['moods'].value as string[];
  //   //  this.toppingsControl.value as string[];
  //   this.removeFirst(selectedMoods, mood);
  //   this.filterForm.controls['moods'].setValue(selectedMoods);
  //   // To trigger change detection
  // }

  // private removeFirst<T>(array: T[], toRemove: T): void {
  //   const index = array.indexOf(toRemove);
  //   if (index !== -1) {
  //     array.splice(index, 1);
  //   }
  // }

  

  // tossleMoodsPerOne(all) {
  //   console.log('All');
  //   console.log(all);
  //   if (this.allMoodsSelected.selected) {
  //     this.allMoodsSelected.deselect();
  //     return false;
  //   }
  //   if (this.formGroup.controls['moods'].value.length == this.moodsList.length)
  //     this.allMoodsSelected.select();

  //   console.log(this.formGroup.controls['moods']);
  // }
  
  // toggleAllMoodsSelection() {
  //   if (this.allMoodsSelected.selected) {
  //     this.formGroup.controls['moods']
  //       .patchValue([...this.moodsList.map(item => item), 0]);
  //   } else {
  //     this.formGroup.controls['moods'].patchValue([]);
  //   }
  //   console.log(this.formGroup.controls['moods']);

  // }

  // tossleCategoriesPerOne(all) {
  //   console.log('All');
  //   console.log(all);
  //   if (this.allCategoriesSelected.selected) {
  //     this.allCategoriesSelected.deselect();
  //     console.log(this.formGroup.value);
  //     return false;
  //   }
  //   if (this.formGroup.controls['categories'].value.length == this.categoryList.length)
  //     this.allCategoriesSelected.select();
  //     console.log(this.formGroup.value);

  //   console.log(this.formGroup.controls['categories']);
  // }
  
  // toggleAllCategoriesSelection() {
  //   if (this.allCategoriesSelected.selected) {
  //     this.formGroup.controls['categories']
  //       .patchValue([...this.categoryList.map(item => item), 0]);
  //   } else {
  //     this.formGroup.controls['categories'].patchValue([]);
  //   }
  //   console.log(this.formGroup.controls['categories']);

  // }

  public changeFormControl(formControl: AbstractControl): void {
    // Object.keys(this.filterForm.controls).forEach(key => {
    //   if(this.filterForm.controls[key] === formControl) {
    //     this.filterForm.controls[key] = formControl;
    //     console.log(this.filterForm.controls['genres'].value);
    //     console.log(this.filterForm.controls['moods'].value);
    //     console.log(this.filterForm.controls['tempo']);
    //   }      
    // });
    // Object.keys(this.selectionFormMap.keys).forEach(key => {
    //   if(formControl === key) {

    //   }
    // });
    this.searchFilterFormMap.selectionFormMap.forEach((value: Selection, key: FormControl) => {
      if(formControl === key) {
        key = formControl as FormControl;
      }
    });
    this.searchFilterFormMap.minMaxSliderFormMap.forEach((value: MinMaxSlider, key: FormGroup) => {
      if(formControl === key) {
        key = formControl as FormGroup;
      }
    });
    
    const searchFilterFormMap: SearchFilterFormMap = {
      selectionFormMap: this.searchFilterFormMap.selectionFormMap,
      minMaxSliderFormMap: this.searchFilterFormMap.minMaxSliderFormMap
    }

    console.log(this.searchFilterFormMap);
    this.filterFormChange.emit(searchFilterFormMap);
  }

  // public changeMinMaxFormGroup(formGroup: FormGroup) {

  // }

}
