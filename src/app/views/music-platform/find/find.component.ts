import { AudioUnitType } from './../../../shared/enums/audio-unit-type.enums';
import { FormBuilderService } from './../../../shared/services/form-builder.service';
import { HttpService } from './../../../shared/services/web-services/http.service';
import { AudioWebService } from 'app/shared/services/web-services/audio-web.service';
import { DecimalPipe } from '@angular/common';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { AudioService } from 'app/shared/services/audio.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { LocalStoreService } from 'app/shared/services/local-store.service';
import { PlayStateControlService } from 'app/shared/services/play-state-control.service';
import { TrackPage } from 'app/shared/models/track-page.model';
import { Track } from 'app/shared/models/track.model';
import { SearchFilterFormMap } from 'app/shared/models/search-filter-form-map.model';
import { MinMaxSlider } from 'app/shared/models/min-max-slider.model';
import { PaginationRequestParams } from 'app/shared/models/pagination-request-params.model';
import { Selection } from 'app/shared/models/selection.model';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

// const ELEMENT_DATA: Sample[] = [
  // {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  // {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  // {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  // {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  // {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  // {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  // {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  // {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  // {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  // {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];



@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss'],
  animations: [egretAnimations],

})
export class FindComponent implements OnInit {


  displayedColumns: string[] = ['artistName', 'title'];
  searchString: string;

  // dataSource = null;

  headerText: string;

  decimalPipe = new DecimalPipe('en-US');

  selectionList: Array<Selection>;
  minMaxList: Array<MinMaxSlider>

  public searchFilterFormMap: SearchFilterFormMap = {
    selectionFormMap: null,
    minMaxSliderFormMap: null
  };

  /** Data accessor function that transforms the weight value to have at most 2 decimal digits. */
  getWeight = (data: PeriodicElement): string => {
    const result = this.decimalPipe.transform(data.weight, '1.0-2');
    return result === null ? '' : result;
  }



  // private playState: boolean;

  public tracks: Array<Track> = [];

  count:number = 0;
  
  page: number = 0;
  pageSize: number = 12;
  sortBy: string = 'title';
  
  public searchForm: FormGroup;
  


  constructor(
    // public sampleLicensingMarketService: SampleLicensingMarketService,
    private audioWebService: AudioWebService,
    private httpService: HttpService,
    public playStateControlService: PlayStateControlService,
    private audioService: AudioService,
    private loader: AppLoaderService,
    private jwt: JwtAuthService,
    private ls: LocalStoreService,
    private fbs: FormBuilderService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    // this.dataSource = new MatTableDataSource<Track>(null);
    this.searchFilterFormMap.selectionFormMap = new Map<FormControl, Selection>();
    this.searchFilterFormMap.minMaxSliderFormMap = new Map<FormGroup, MinMaxSlider>();


    this.fbs.buildTrackFilterForm().subscribe((filterFormMap) => {
      // this.filterFormMap = filterFormMap;
      // const filterForm: FormGroup = this.buildFilterForm()

      this.selectionList = filterFormMap.get('selection') as Array<Selection>;
      this.minMaxList = filterFormMap.get('minMaxSlider') as Array<MinMaxSlider>;

      this.initSearchFilterFormMap(this.selectionList, this.minMaxList);
    });

    // this.audioWebService.searchFilterSubject$.pipe(
    //   // throttle()

    //   debounceTime(500)

    // ).subscribe((trackPage: TrackPage) => {
    //   console.log('Apply')
    //   const { tracks, totalItems } = trackPage
    //   this.tracks = tracks;
    //   this.count = totalItems;
    // }
    // );

    this.retrieveTracks();    
    this.searchForm = this.fbs.buildSearchForm();
    // this.sampleLicensingMarketService.buildSearchForm();

    // this.sampleLicensingMarketService.samples$.pipe(
    //   // debounceTime(500),
    //   map((samples: Array<Sample>) => {
    //     if (this.playState) {
    //       this.playStateControlService.emitPlayState(false);
    //     }
    //     this.loader.close();
    //     if(samples.length > 0) {
    //       this.audioService.createWavesurferObj();
    //       this.audioService.loadPlayAudio(samples[0].sampleID);
    //     }
    //     return samples;
    //   }),
    //   takeUntil(this.sampleLicensingMarketService.sampleLicensingMarketDestroyed$),
    // ).subscribe((samples: Array<Sample>) => {
    //   if(samples.length > 0) {
    //     this.initCurrentFile(samples[0].sampleID);
    //   }
    // });
  
    
    // this.retrieveSamples();
  }

  public retrieveTracks(): void {
    const params = this.httpService.getRequestParams(this.sortBy, this.page, this.pageSize);
    this.loader.open();
    this.audioWebService.getTracksHome(params).subscribe((trackPage: TrackPage) => {
      const totalItems  = trackPage.totalItems;
      this.tracks = trackPage.tracks;
      this.count = totalItems;
      this.audioService.initAudioPlayer(this.tracks.map((track) => track.audioUnit));
      this.playStateControlService.emitCurrentSampleID(this.tracks[0].audioUnit.audioUnitID);
      
      // this.dataSource = new MatTableDataSource(tracks);
      this.loader.close();
    }, (error) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          this.ls.clear();
          this.jwt.signin();
        }
      }
    });
  }
    
    // this.sampleLicensingMarketService.initSamples(params).pipe(
    //   share(),
    // ).subscribe((response) => {
    //   console.log("Response");
    //   console.log(response);
    //   const { samples, totalItems } = response;
    //   this.count = totalItems;
    //   this.sampleLicensingMarketService.samples$.next(samples);
    //   this.dataSource = new MatTableDataSource(samples);
      
    // }, (error) => {
    //   if (error instanceof HttpErrorResponse) {
    //     if (error.status === 401) {
    //       this.ls.clear();
    //       this.jwt.signin();
    //     }
    //   }
    //   console.log(error);
    // });

  // initCurrentFile(audioUnitID: string) {
  //   // this.playStateControlService.saveIDCurrentPlayElement(sampleID);
  //   this.playStateControlService.emitCurrentSampleID(audioUnitID);
  // }

  

  

  changeSearchString(searchString: string) {
    this.searchString = searchString;
    // this.applyFilter(this.searchFilterFormMap);
  }

  changePage(page: number) {
    this.page = page;
    this.initSearchFilterFormMap(this.selectionList, this.minMaxList);
  }

  changeCount(count: number) {
    this.count = count;
  }

  initSearchFilterFormMap(selectionList: Array<Selection>, minMaxSliderList: Array<MinMaxSlider>) {
    this.searchFilterFormMap.selectionFormMap.clear();
    this.searchFilterFormMap.minMaxSliderFormMap.clear();
    selectionList.forEach(selection => {
      this.searchFilterFormMap.selectionFormMap.set(new FormControl(selection.contentList, [Validators.required]), selection);
    });

    minMaxSliderList.forEach((minMaxSlider) => {
      this.searchFilterFormMap.minMaxSliderFormMap.set(this.fb.group({
        'minControl': [minMaxSlider.minValue, []],
        'maxControl': [minMaxSlider.maxValue, []]
      }), minMaxSlider);
    });
  }


  toggleFilter(e: any) {

  }

  toggleSidenav() {

  }

  public applyFilter(searchFilterFormMap?: SearchFilterFormMap) {

    if (searchFilterFormMap) {
      this.searchFilterFormMap = searchFilterFormMap;
    }
    // const paginationRequestParams: PaginationRequestParams = ;
    // {
    //   sortBy: this.sortBy,
    //   pageNo: 0,
    //   pageSize: this.pageSize
    // }
    // this.responseReceived = false;
    // (this.searchForm.controls['search'] as FormControl).value.title as string
    
    this.audioWebService.applySearchFilter(this.searchString, this.searchFilterFormMap, AudioUnitType.Track ,new PaginationRequestParams(this.sortBy, 0, this.pageSize));
    // .pipe(
    //   debounceTime(5000)
    // )
    // .subscribe((response) => {
    //   console.log('Apply')
    //   const { samples, totalItems } = response;
    //   this.count = totalItems;
    //   this.sampleLicensingMarketService.samples$.next(samples);
    // })
    // ;

  }


  public filterTracks() {
    this.loader.open();
    this.audioWebService.filterTracks(
      // this.searchString,
      new HttpParams()
        .set('search', this.searchString)
        .set('pageNo', '0')
        .set('pageSize', JSON.stringify(this.pageSize))
        .set('sortBy', this.sortBy)
    ).subscribe((trackPage: TrackPage) => {
      const totalItems  = trackPage.totalItems;
      this.tracks = trackPage.tracks;
      this.count = totalItems;
      this.audioService.initAudioPlayer(this.tracks.map((track) => track.audioUnit));
      this.playStateControlService.emitCurrentSampleID(this.tracks[0].audioUnit.audioUnitID);
      
      // this.dataSource = new MatTableDataSource(tracks);
      this.loader.close();
    }, (error) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          this.ls.clear();
          this.jwt.signin();
        }
      }
    });
  }


  public applySuggestions(tracks: Array<Track>)  {
    this.tracks = tracks;
  }




  


}
