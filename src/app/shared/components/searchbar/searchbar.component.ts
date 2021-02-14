import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SampleLicensingMarketService } from './../../../views/sample-licensing-market/sample-licensing-market.service';
import { AudioWebService } from './../../services/web-services/audio-web.service';
import { Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter, HostListener } from '@angular/core';
import { MatOption, MatOptionSelectionChange } from '@angular/material/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Sample } from 'app/shared/models/sample.model';
import { Subject } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteTrigger, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  @ViewChild('searchInput', { static: false, read: ElementRef }) private searchInput: ElementRef;
  @ViewChild('searchInputTrigger', { static: false, read: MatAutocompleteTrigger }) private matSearchInputTrigger: MatAutocompleteTrigger;
  @ViewChild('auto', { static: false, read: MatAutocomplete }) private matAutoComplete: MatAutocomplete;

  @Input() sortBy: string;
  @Input() page: number; 
  @Input() pageSize: number; 
  @Input() searchForm: FormGroup;

  @Output() pageChange = new EventEmitter<number>();
  @Output() countChange = new EventEmitter<number>();
  @Output() expandFilter = new EventEmitter<boolean>();
  @Output() sidenavChange = new EventEmitter<void>();
  // @Output() searchFormChange = new EventEmitter<FormGroup>();
  @Output() searchStringChange = new EventEmitter<string>();

  public searchString: string;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.matSearchInputTrigger.closePanel();
  }

  public isFilterOpen: boolean = false;
  // private isSidenavOpen;

  public suggestionsSubject$: Subject<Array<Sample>> = new Subject<Array<Sample>>();
  

  public suggestions: Array<Sample>;
  public suggestionsCount = 0; 

  public selectedSearchOption: MatOption = null;

  // public searchForm: FormGroup;

  constructor(
    private audioWebService: AudioWebService,
    private sampleLicensingMarketService: SampleLicensingMarketService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.suggestionsSubject$.subscribe((suggestions: Array<Sample>) => {
      this.suggestions = suggestions;
    });

    this.sampleLicensingMarketService.samples$.pipe(
      map((samples: Array<Sample>) => {
        // (this.searchInput.nativeElement as HTMLInputElement).value = '';
        this.matSearchInputTrigger.closePanel();
        this.selectedSearchOption = null;
      })
    )
    // this.buildSearchForm();

  }

  // buildSearchForm() {
  //   this.searchForm = this.fb.group({
  //     search: [''],
  //     // category: ['all'],
  //     // genre: ['all'],
  //     // minPrice: [filterData.minPrice],
  //     // maxPrice: [filterData.maxPrice],
  //     // minRating: [filterData.minRating],
  //     // maxRating: [filterData.maxRating]
  //   });
  // }

  public toggleSidenav() {
    this.sidenavChange.emit();
    // this.sideNav.opened = !this.sideNav.opened;
  }

  public retrieveSuggestions(searchString: string) {
    // console.log(this.searchForm.value);
    if(searchString) {
      const params = this.sampleLicensingMarketService.getRequestParams(this.sortBy, 1, this.pageSize);
      params['searchString'] = searchString;
      // this.searchForm.setValue({
      //   search: searchString
      // });
      // this.searchForm.controls['search'].setValue(searchString);
      this.searchString = searchString;
      this.emitSearchString(this.searchString);
      this.audioWebService.findBySearchString(params).pipe().subscribe((response) => {
        
        this.suggestionsCount = response.totalItems;
        console.log('Suggestionscount' + this.suggestionsCount )
        console.log(response.samples);
        // if(response.samples.length > 0) {
          this.suggestionsSubject$.next(response.samples);
          
          console.log(searchString);
        // }
        // this.sampleSuggestions = response.samples;
      }, (error: HttpErrorResponse) => {
        if(error.status === 404) {
          this.suggestionsSubject$.next([]);
          this.matSearchInputTrigger.openPanel();
          
          // alert('Nothing found');
        }
      });
    }
  }

  public emitSearchString(searchString: string) {
    console.log('SearchFormEmit');
    console.log(this.searchForm);
    this.searchStringChange.emit(searchString);
    // this.searchFormChange.emit(this.sea);
  }

  public convertSuggestionsToSamples(sample?: Sample) {
    
    
    if(sample) {
      const index = this.suggestions.indexOf(sample);
      const removedSample: Array<Sample> = this.suggestions.splice(index, 1);
      this.suggestions.unshift(removedSample[0]);
      // this.searchForm.controls['search'].setValue(sample);
      // this.emitSearchString(this.searchString);
      // (this.searchInput.nativeElement as HTMLInputElement).value = sample.title; 
      // this.searchForm.controls['search'].setValue(sample);
      console.log('SAMPLE');
      this.selectedSearchOption = null;
      // this.emitSearchString(this.searchString);
      // this.emitSearchString(this.searchForm.controls['search'].value.title);
    }
    
    this.pageChange.emit(1);
    this.countChange.emit(this.suggestionsCount);
    this.sampleLicensingMarketService.samples$.next(this.suggestions);
    
    // this.suggestionsSubject$.next([]);
    console.log('SearchFormComvert');
    console.log(this.searchForm);
  }

  public changeSelectedSample(event: MatOptionSelectionChange) {
    // angular bug fix. Event fires multiple times: https://github.com/angular/components/issues/4094
    // this.emitSearchForm();
    if (event.source.selected) {
      console.log(this.searchForm);
      // console.log(suggestion.title);
      this.selectedSearchOption = event.source;
      // this.searchForm.controls['search'].setValue(suggestion.title);
      // console.log(this.selectedSearchOption.value);
    }
  }

  public displaySample(sample: Sample): string {
    
    
    if (sample) {
      return sample.title;
      // return sample.title + ' ' + '(' + sample.artistName + ')';
      
      

    } else {
      return '';
    }
  }

  toggleFilter() {
    this.isFilterOpen = !this.isFilterOpen;
    this.expandFilter.emit(this.isFilterOpen);
  }

  optionSelected(e: MatAutocompleteSelectedEvent) {
    console.log(event);
    console.log(e.option.value);
    // this.searchInput.nativeElement.value = e.option.value.title;
  }

  
  getSelectedTitle(): string {
    if(this.selectedSearchOption) {
      return this.selectedSearchOption.value.title;
    }
  }
  

}
