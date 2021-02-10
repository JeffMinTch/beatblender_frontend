import { FormGroup, FormBuilder } from '@angular/forms';
import { SampleLicensingMarketService } from './../../../views/sample-licensing-market/sample-licensing-market.service';
import { AudioWebService } from './../../services/web-services/audio-web.service';
import { Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter, HostListener } from '@angular/core';
import { MatOption, MatOptionSelectionChange } from '@angular/material/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Sample } from 'app/shared/models/sample.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';

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
  @Output() searchFormChange = new EventEmitter<FormGroup>();

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
        (this.searchInput.nativeElement as HTMLInputElement).value = '';
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
    const params = this.sampleLicensingMarketService.getRequestParams(this.sortBy, 1, this.pageSize);
    params['searchString'] = searchString;
    this.audioWebService.findBySearchString(params).subscribe((response) => {
      this.suggestionsCount = response.totalItems;
      console.log(response.samples);
      this.suggestionsSubject$.next(response.samples);
      this.emitSearchForm();
      // this.sampleSuggestions = response.samples;
    });
  }

  public emitSearchForm() {
    this.searchFormChange.emit(this.searchForm);
  }

  public convertSuggestionsToSamples(sample?: Sample) {
    
    if(sample) {
      const index = this.suggestions.indexOf(sample);
      const removedSample: Array<Sample> = this.suggestions.splice(index, 1);
      this.suggestions.unshift(removedSample[0]);
    }
    this.pageChange.emit(1);
    this.countChange.emit(this.suggestionsCount);
    this.sampleLicensingMarketService.samples$.next(this.suggestions);
    this.suggestionsSubject$.next(new Array<Sample>());
  }

  public changeSelectedSample(event: MatOptionSelectionChange) {
    // angular bug fix. Event fires multiple times: https://github.com/angular/components/issues/4094
    if (event.source.selected) {
      this.selectedSearchOption = event.source;
      console.log(this.selectedSearchOption.value);
    }
  }

  public displaySample(sample: Sample): string {
    
    
    if (sample) {
      
      return sample.title + ' ' + '(' + sample.artistName + ')';
      
      

    } else {
      return '';
    }
  }

  toggleFilter() {
    this.isFilterOpen = !this.isFilterOpen;
    this.expandFilter.emit(this.isFilterOpen);
  }

  
  

}
