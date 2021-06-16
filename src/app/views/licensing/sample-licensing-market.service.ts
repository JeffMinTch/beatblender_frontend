import { MinMaxSlider } from '../../shared/models/min-max-slider.model';
import { AudioWebService } from '../../shared/services/web-services/audio-web.service';
import { Injectable, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { throwError as observableThrowError, Observable, Subject, BehaviorSubject } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { map } from 'rxjs/internal/operators/map';
import { Sample } from 'app/shared/models/sample.model';
import { SampleSearchQuery } from 'app/shared/models/sample-search-query.model';
import { SidenavContent } from 'app/shared/models/sidenav-content.model';
import { Selection } from 'app/shared/models/selection.model';
import { SamplePage } from 'app/shared/models/sample-page.model';



export interface RightSidenavData {
  toggleState: boolean,
  apply: SidenavContent
}

@Injectable(
  {
    providedIn: 'root'
  }
)
export class SampleLicensingMarketService implements OnDestroy {

  public samplesLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public toggleFilter$: BehaviorSubject<RightSidenavData> = new BehaviorSubject<RightSidenavData>({ toggleState: false, apply: SidenavContent.Filter });
  public sampleLicensingMarketDestroyed$: Subject<void> = new Subject<void>();
  // public samples$: Observable<Sample[]>;
  public samples$: Subject<Array<Sample>> = new Subject<Array<Sample>>();
  public sampleSearchQueries$: Observable<any>;

  public sampleSearchQueries: SampleSearchQuery[];
  private samples: Array<Sample>;
  private samplePage: SamplePage;
  public initialFilters = {
    minLep: 1,
    maxLep: 1000,
    minTempo: 1,
    maxTempo: 300
  };

  genres = ['Blues', 'Classical', 'Country', 'Electronic', 'Hip Hop/Rap', 'Jazz', 'Latin', 'Pop', 'RnB/Soul', 'Reggea', 'Rock', 'Spoken Word'];
  moods = ['ambient', 'angry', 'bouncy', 'calming', 'carefree', 'cheerful', 'cold', 'complex', 'cool', 'dark', 'disturbing', 'dramatic', 'dreamy', 'eerie', 'elegant', 'energetic', 'enthusiastic', 'epic', 'fun', 'funky', 'futuristic', 'gentle', 'gleeful', 'gloomy', 'groovy', 'happy', 'harsh', 'haunting', 'humorous', 'hypnotic', 'industrial', 'intense', 'intimate', 'joyous', 'laid-back', 'light', 'lively', 'manic', 'mellow', 'mystical', 'ominous', 'passionate', 'pastoral', 'peaceful', 'playful', 'poignant', 'quiet', 'rebellious', 'reflective', 'romantic', 'rowdy', 'sad', 'sentimental', 'sexy', 'smooth', 'soothing', 'sophisticated', 'spacey', 'spiritual', 'strange', 'sweet', 'theater', 'trippy', 'warm', 'whimsical'];
  categories = ['trending', 'new', 'eternal', 'low option price', 'high option price', 'bargain'];

  constructor(
    private audioWebService: AudioWebService,
    private fb: FormBuilder
  ) {
  }

  ngOnDestroy(): void {
    this.sampleLicensingMarketDestroyed$.next();
  }

  emitSamplesLoading(value: boolean) {
    this.samplesLoading$.next(value);
  }

  public initSamples(params): Observable<SamplePage> {
    this.emitSamplesLoading(true);
    return this.audioWebService.getSamplePage(params).pipe(
      map((response: SamplePage) => {
        // console.log(response.audioFileResponse);
        this.emitSamplesLoading(false);
        return response;
      })
    );
  }

  // public searchAudioByFormInput(searchString: string): void {
  //   this.sampleSearchQueries$ = this.audioWebService.searchAudioByFormInput(searchString).pipe(map((data: any) => data.sampleSearchQueries));
  //   this.sampleSearchQueries$.subscribe((sampleSearchQueries: SampleSearchQuery[]) => {
  //     this.sampleSearchQueries = sampleSearchQueries;
  //   });
  // }


  // public searchMusicByFormSubmit(sampleIDs: Array<number>):void {
  //   // this.samples$ = this.cloudService.searchMultipleAudio(sampleIDs).pipe(
  //   //   map((data:any) => data.audioFileResponse),
  //   //   delay(2000),
  //   //   share()
  //   // );
  //   this.audioWebService.searchMultipleAudio(sampleIDs).pipe(
  //     map((data:any) => data.audioFileResponse),
  //     delay(2000),
  //     share()
  //   ).subscribe((samples: Array<Sample>) => {
  //     this.samples$.next(samples);
  //   });
  // }


  public applyFilter() {

  }

  getSamplePage(): SamplePage {
    return this.samplePage;
  }

  public getSamplesObservable(): Observable<Array<Sample>> {
    return this.samples$;
  }

  public getCategories(): Observable<any> {
    let categories = ['trending', 'new', 'eternal', 'low option price', 'high option price', 'bargain'];
    return of(categories);
  }

  public getGenres(): Observable<string[]> {
    let genres = ['Blues', 'Classical', 'Country', 'Electronic', 'Hip Hop/Rap', 'Jazz', 'Latin', 'Pop', 'RnB/Soul', 'Reggea', 'Rock', 'Spoken Word'];
    return of(genres);
  }

  public getMoods(): Observable<Array<string>> {
    const moods = ['ambient', 'angry', 'bouncy', 'calming', 'carefree', 'cheerful', 'cold', 'complex', 'cool', 'dark', 'disturbing', 'dramatic', 'dreamy', 'eerie', 'elegant', 'energetic', 'enthusiastic', 'epic', 'fun', 'funky', 'futuristic', 'gentle', 'gleeful', 'gloomy', 'groovy', 'happy', 'harsh', 'haunting', 'humorous', 'hypnotic', 'industrial', 'intense', 'intimate', 'joyous', 'laid-back', 'light', 'lively', 'manic', 'mellow', 'mystical', 'ominous', 'passionate', 'pastoral', 'peaceful', 'playful', 'poignant', 'quiet', 'rebellious', 'reflective', 'romantic', 'rowdy', 'sad', 'sentimental', 'sexy', 'smooth', 'soothing', 'sophisticated', 'spacey', 'spiritual', 'strange', 'sweet', 'theater', 'trippy', 'warm', 'whimsical'];
    return of(moods);
  }

  public retrieveMinMaxSlider(): Array<MinMaxSlider> {
    const minMaxSliderArray: Array<MinMaxSlider> = new Array<MinMaxSlider>();
    minMaxSliderArray.push({
      label: 'tempo',
      minValue: 1,
      maxValue: 300
    });
    minMaxSliderArray.push({
      label: 'lep',
      minValue: 1,
      maxValue: 1000
    });
    return minMaxSliderArray;
  }

  // public retrieveSelectionSlider() {
  //   const selectionList: Array<Selection> = new Array<Selection>();
  //   selectionList.push({
  //     label: 'genres',

  //   })
  // }

  public getFilterFormData(): Observable<Map<string, Array<Selection> | Array<MinMaxSlider>>> {
    const filterFormMap: Map<string, Array<Selection> | Array<MinMaxSlider>> = new Map<string, Array<Selection> | Array<MinMaxSlider>>();
    const selectionList: Array<Selection> = new Array<Selection>();
    selectionList.push({
      contentList: this.genres,
      label: 'genres',
      placeholder: 'genres' 
    });
    selectionList.push({
      contentList: this.moods,
      label: 'moods',
      placeholder: 'moods' 
    });
    selectionList.push({
      contentList: this.categories,
      label: 'categories',
      placeholder: 'categories' 
    });

    filterFormMap.set('selection', selectionList);
    const minMaxSliderArray: Array<MinMaxSlider> = new Array<MinMaxSlider>();
    minMaxSliderArray.push({
      label: 'Tempo',
      minValue: 1,
      maxValue: 300
    });
    minMaxSliderArray.push({
      label: 'Lep',
      minValue: 1,
      maxValue: 1000
    });
    filterFormMap.set('minMaxSlider', minMaxSliderArray);
    return of(filterFormMap);
  }

  
  // public getSelectionList(): Observable<Map<AbstractControl, Array<Selection | string>>> {
  //   const controlSelectionMap: Map<AbstractControl, Array<Selection | string>> = new Map<AbstractControl, Array<Selection | string>>();
  //   const
  //   return
  //   // selections.push({
  //   //   contentList: this.genres,
  //   //   label: 'genres',
  //   //   placeholder: 'genres' 
  //   // });
  //   // selections.push({
  //   //   contentList: this.moods,
  //   //   label: 'moods',
  //   //   placeholder: 'moods' 
  //   // });
  //   // selections.push({
  //   //   contentList: this.categories,
  //   //   label: 'categories',
  //   //   placeholder: 'categories' 
  //   // });
  //   // return of(selections);
  // }

  public buildFilterForm(filterData: any = {}):FormGroup {
    return this.fb.group({
      'categories': [this.categories, []],
      'genres': [this.genres, []],
      'moods': [this.moods, []],
      'tempo': this.fb.group({
        'minTempo': [filterData.minTempo],
        'maxTempo': [filterData.maxTempo],
      }),
      'lep': this.fb.group({
        'minLep': [filterData.minLep],
        'maxLep': [filterData.maxLep]
      }),
    });
  }

  buildSearchForm(): FormGroup {
    return this.fb.group({
      'search': ['']
    });
  }

  // public getRequestParams(sortBy: string, page: number, pageSize: number) {
  //   const params = {};
  //   if (sortBy) {
  //     params['sortBy'] = sortBy;
  //   }

  //   if (page) {
  //     params['page'] = page - 1;
  //   }

  //   if (pageSize) {
  //     params['pageSize'] = pageSize;
  //   }
  //   return params;
  // }

}
