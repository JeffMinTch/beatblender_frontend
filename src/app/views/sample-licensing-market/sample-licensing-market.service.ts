import { AudioWebService } from './../../shared/services/web-services/audio-web.service';
import { CloudService } from './../../shared/services/cloud-service.service';
import { Injectable, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductDB } from 'app/shared/inmemory-db/products';
import { combineLatest, throwError as observableThrowError, Observable, Subject, BehaviorSubject, empty, EMPTY } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { delay } from 'rxjs/internal/operators/delay';
import { map } from 'rxjs/internal/operators/map';
import { debounceTime, share, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { Sample } from 'app/shared/models/sample.model';
import { defaultIfEmpty } from 'rxjs-compat/operator/defaultIfEmpty';
import { SampleSearchQuery } from 'app/shared/models/sample-search-query.model';
import { SidenavContent } from 'app/shared/models/sidenav-content.model';



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
  
  public toggleFilter$: BehaviorSubject<RightSidenavData> = new BehaviorSubject<RightSidenavData>({toggleState: false, apply: SidenavContent.Filter});
  public sampleLicensingMarketDestroyed$: Subject<void> = new Subject<void>();
  // public samples$: Observable<Sample[]>;
  public samples$: Subject<Array<Sample>> = new Subject<Array<Sample>>();
  public sampleSearchQueries$: Observable<any>;

  public sampleSearchQueries: SampleSearchQuery[];
  private samples: Array<Sample>;
  public initialFilters = {
    minPrice: 10,
    maxPrice: 40,
    minRating: 1,
    maxRating: 5
  };
  
  constructor(
    private audioWebService: AudioWebService
    ) {
  }

  ngOnDestroy(): void {
    this.sampleLicensingMarketDestroyed$.next();
  }

  emitSamplesLoading(value: boolean) {
    this.samplesLoading$.next(value);
  }
  
  public getAudioFiles(params): Observable<any> {
    this.emitSamplesLoading(true);
    return this.audioWebService.getAudioFiles(params).pipe(
      map(response => {
        // console.log(response.audioFileResponse);
        this.emitSamplesLoading(false);
        return response;
      })
    );
  }

  public searchAudioByFormInput(searchString: string): void {
    this.sampleSearchQueries$ = this.audioWebService.searchAudioByFormInput(searchString).pipe(map((data: any) => data.sampleSearchQueries));
    this.sampleSearchQueries$.subscribe((sampleSearchQueries: SampleSearchQuery[]) => {
      this.sampleSearchQueries = sampleSearchQueries;
    });
  }


  public searchMusicByFormSubmit(sampleIDs: Array<number>):void {
    // this.samples$ = this.cloudService.searchMultipleAudio(sampleIDs).pipe(
    //   map((data:any) => data.audioFileResponse),
    //   delay(2000),
    //   share()
    // );
    this.audioWebService.searchMultipleAudio(sampleIDs).pipe(
      map((data:any) => data.audioFileResponse),
      delay(2000),
      share()
    ).subscribe((samples: Sample[]) => {
      this.samples$.next(samples);
    });
  }


  public applyFilter() {
    
  }

  getSamples(): Sample[] {
    return this.samples;
  }

  public getSamplesObservable(): Observable<Sample[]> {
    return this.samples$;
  }

  public getCategories(): Observable<any> {
    let categories = ['trending', 'new', 'eternal', 'low option price' , 'high option price', 'bargain'];
    return of(categories);
  }

  public getGenres(): Observable<string[]> {
    let genres = ['Blues', 'Classical', 'Country', 'Electronic', 'Hip Hop/Rap', 'Jazz', 'Latin', 'Pop', 'RnB/Soul', 'Reggea', 'Rock', 'Spoken Word'];
    return of(genres);
  }

}
