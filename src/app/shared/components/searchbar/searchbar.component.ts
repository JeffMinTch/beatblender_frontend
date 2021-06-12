import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SampleLicensingMarketService } from '../../../views/licensing/sample-licensing-market.service';
import { AudioWebService } from './../../services/web-services/audio-web.service';
import { Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter, HostListener } from '@angular/core';
import { MatOption, MatOptionSelectionChange } from '@angular/material/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Sample } from 'app/shared/models/sample.model';
import { Subject } from 'rxjs';
import { map, debounceTime, skipWhile, skipUntil } from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteTrigger, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Track } from 'app/shared/models/track.model';
import { SamplePage } from 'app/shared/models/sample-page.model';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  @ViewChild('searchInput', { static: false, read: ElementRef }) private searchInput: ElementRef;
  @ViewChild('searchInputTrigger', { static: false, read: MatAutocompleteTrigger }) private matSearchInputTrigger: MatAutocompleteTrigger;
  @ViewChild('auto', { static: false, read: MatAutocomplete }) private matAutoComplete: MatAutocomplete;

  @Input() page: number;
  @Input() sortBy: string;
  @Input() pageSize: number;
  @Input() searchForm: FormGroup;

  @Output() pageChange = new EventEmitter<number>();
  @Output() countChange = new EventEmitter<number>();
  @Output() expandFilter = new EventEmitter<boolean>();
  @Output() sidenavChange = new EventEmitter<void>();
  // @Output() searchFormChange = new EventEmitter<FormGroup>();
  @Output() searchStringChange = new EventEmitter<string>();
  @Output() searchRequest = new EventEmitter<void>();

  // public responseReceivedEvent: Subject<void>  = new Subject<void>(); 
  public searchString: string;
  public counter: number = 0;
  public searchbarEmpty: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.matSearchInputTrigger.closePanel();
  }

  public isFilterOpen: boolean = false;
  // private isSidenavOpen;

  public suggestionsSubject$: Subject<Array<Sample | Track>> = new Subject<Array<Sample | Track>>();


  public suggestions: Array<Sample | Track>;
  public suggestionsCount = 0;

  public selectedSearchOption: MatOption = null;

  // public searchForm: FormGroup;

  constructor(
    private audioWebService: AudioWebService,
    private sampleLicensingMarketService: SampleLicensingMarketService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.suggestionsSubject$.subscribe((suggestions: Array<Sample | Track>) => {
      this.suggestions = suggestions;
    });

    this.sampleLicensingMarketService.samples$.pipe(
      map((samples: Array<Sample | Track>) => {
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
    this.searchbarEmpty = false;
    console.log(searchString);
    if (searchString) {
      const params = this.sampleLicensingMarketService.getRequestParams(this.sortBy, 1, this.pageSize);
      params['searchString'] = searchString;
      this.searchString = searchString;
      this.emitSearchString(this.searchString);
      this.audioWebService.findBySearchString(params).pipe(
        // map((response) => {
        //   this.searchbarEmpty = false;
        //   return response;
        // }),
        skipWhile(() => {
          if(this.searchbarEmpty) {
            this.searchbarEmpty = false;
            return true;
          } else {
            return false;
          }
        //  return this.searchbarEmpty
        }),
      ).subscribe((response: SamplePage) => {

        // if (!this.searchbarEmpty) {
        this.suggestionsCount = response.totalItems;
        console.log('Suggestionscount' + this.suggestionsCount)
        console.log(response.samples);
        this.suggestionsSubject$.next(response.samples);
        // this.responseReceivedEvent.next();
        // }
      }, (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.suggestionsSubject$.next([]);
          this.matSearchInputTrigger.openPanel();
        }
      });
    } else {
      console.log("Suggestions null");
      // setTimeout(() => {
      let counter = 0;

      this.suggestionsSubject$.next(null);
      this.searchbarEmpty = true;
      this.selectedSearchOption = null;
      this.counter = 0;

      // this.suggestionsSubject$.subscribe(() => {
      //   if (counter = 0) {
      //     counter++;

      //   } else {
      //     this.suggestionsSubject$.unsubscribe();

      //   }
      // });
      // });
    }
  }

  public emitSearchString(searchString: string) {
    console.log('SearchFormEmit');
    console.log(this.searchForm);
    this.searchStringChange.emit(searchString);
    // this.searchFormChange.emit(this.sea);
  }

  // public convertSuggestionsToSamples(sample?: Sample) {

  //   if(this.counter > 0) {
  //     this.searchStringChange.emit(this.searchString);
  //     this.searchRequest.emit();
  //     this.counter = 0;
  //   } else {
  //     if(sample) {
  //       const index = this.suggestions.indexOf(sample);
  //       const removedSample: Array<Sample> = this.suggestions.splice(index, 1);
  //       this.suggestions.unshift(removedSample[0]);
  //       this.selectedSearchOption = null;
  //     }
  //     this.pageChange.emit(1);
  //     this.countChange.emit(this.suggestionsCount);
  //     this.sampleLicensingMarketService.samples$.next(this.suggestions);
  //     this.counter++;

  //   }

  // }

  public handleSearchbar(searchString: string, sample?: Sample | Track) {
    console.log(sample);
    if (searchString) {
      if (this.counter > 0) {
        this.fetchSamples();
        this.counter = 0;
      } else {
        if (sample) {
          this.convertSuggestionsToSamples(sample);
        } else {
          this.convertSuggestionsToSamples();
        }
        this.counter++;

      }
    }
  }

  fetchSamples() {
    this.searchStringChange.emit(this.searchString);
    this.searchRequest.emit();
  }

  convertSuggestionsToSamples(audioUnit?: Sample | Track) {
    if (audioUnit) {
      const index = this.suggestions.indexOf(audioUnit);
      const removedSample: Array<Sample | Track> = this.suggestions.splice(index, 1);
      this.suggestions.unshift(removedSample[0]);
      this.selectedSearchOption = null;
    }
    this.pageChange.emit(1);
    this.countChange.emit(this.suggestionsCount);
    // if(audioUnit instanceof Sample) {
      this.sampleLicensingMarketService.samples$.next(this.suggestions as Array<Sample>);
    // }
  }

  // public searchRequest(sample?: )

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

  public displaySample(audioUnit: Sample | Track): string {


    if (audioUnit) {
      return audioUnit.audioUnit.title;
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
    if (this.selectedSearchOption) {
      return this.selectedSearchOption.value.title;
    }
  }


}
