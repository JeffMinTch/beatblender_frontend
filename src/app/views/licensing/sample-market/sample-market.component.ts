import { SimpleDialogComponent } from './../../../shared/components/dialogs/simple-dialog/simple-dialog.component';
import { LicenseWebService } from './../../../shared/services/web-services/license-web.service';
import { MatchMediaService } from './../../../shared/services/match-media.service';
import { SearchFilterFormMap } from '../../../shared/models/search-filter-form-map.model';
import { MinMaxSlider } from '../../../shared/models/min-max-slider.model';
import { Selection } from '../../../shared/models/selection.model';
import { debounceTime } from 'rxjs/operators';
import { AudioWebService } from '../../../shared/services/web-services/audio-web.service';
import { LocalStoreService } from '../../../shared/services/local-store.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { LayoutService } from '../../../shared/services/layout.service';
import { SampleSearchQuery } from 'app/shared/models/sample-search-query.model';
import { AudioService } from '../../../shared/services/audio.service';
import { share, takeUntil } from 'rxjs/operators';
import { PlayStateControlService } from '../../../shared/services/play-state-control.service';
import { AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SampleLicensingMarketService } from '../sample-licensing-market.service';
import { Sample } from 'app/shared/models/sample.model';
import { AudioState } from 'app/shared/models/audio-state.model';
import { MatSliderChange } from '@angular/material/slider';
import { SidenavContent } from 'app/shared/models/sidenav-content.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SamplePage } from '../../../shared/models/sample-page.model';
import { PaginationRequestParams } from 'app/shared/models/pagination-request-params.model';
import { HttpService } from 'app/shared/services/web-services/http.service';
import { AudioUnitType } from 'app/shared/enums/audio-unit-type.enums';
import { Theme } from 'app/shared/enums/theme.enum';


@Component({
  selector: 'app-sample-market',
  templateUrl: './sample-market.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [egretAnimations],
  // tslint:disable-next-line:use-component-view-encapsulation
  encapsulation: ViewEncapsulation.None,
})
export class SampleMarketComponent implements OnInit, AfterViewInit {
  public isFilterOpen: boolean = false;
  public isSideNavOpen: boolean;
  public viewMode = 'grid-view';
  public currentPage: any;


  private _playState: boolean;
  private _currentSampleID: string;
  public genres$: Observable<string[]>;
  public activeCategory = 'all';
  public activeGenre = 'all';
  public sampleSearchQueries: SampleSearchQuery[];
  public searchForm: FormGroup;
  searchString: string;
  selectionList: Array<Selection>;
  minMaxList: Array<MinMaxSlider>;
  public searchFilterFormMap: SearchFilterFormMap = {
    selectionFormMap: null,
    minMaxSliderFormMap: null
  };

  responseReceived: boolean = true;
  currentTime: number;
  duration: number;

  pageNo: number = 0;
  pageSize: number = 1;
  sortBy: string = 'title';
  count: number = 0;

  selectedGenres: string[];
  selectedRegions: string[];
  selectedTrackTypes: string[];
  selectedSongKeys: string[];

  // tslint:disable-next-line:max-line-length
  // public genreList: string[] = ['Blues', 'Classical', 'Country', 'Electronic', 'Hip Hop/Rap', 'Jazz', 'Latin', 'Pop', 'RnB/Soul', 'Reggea', 'Rock', 'Spoken Word'];
  public regionList: string[] = ['Northern Europe', 'Western Europe', 'Southern Europe', 'Eastern Europe', 'Middle East', 'Caribbean', 'Oceania, Pacific', 'Southern Africa', 'Northern Africa', 'Western Africa', 'Eastern Africa', 'South Asia/India', 'East Asia', 'North America', 'South America', 'Central America'];
  public trackTypeList: string[] = ['Accordion', 'Bass', 'Drum', 'Edits', 'Flute', 'FX track', 'Guitar', 'Horns', 'Instrumental', 'Keyborads', 'Master', 'Percussion', 'Shruti Box', 'Sound FX', 'Strings', 'Vocals', 'Whistle'];

  moodsList: string[];
  genreList: string[];
  categoryList: Array<string>;
  selections: Array<Selection> = new Array<Selection>();
  // public songKeyList: string[] = ['A major', 'A minor', 'A flat major', 'A flat minor', 'B major', 'B minor', 'B flat major', 'B flat minor', 'C major', 'C minor', 'D major', 'D minor', 'D flat major', 'D flat minor', 'E major', 'E minor', 'E flat major', 'E flat minor', 'F major', 'F minor', 'G major', 'G minor', 'G flat major', 'G flat minor'];


  // public mockCategories: string[] = ['Trending', 'New', 'Low Sample Price', 'Bargain', 'High Option Price', 'Trending', 'Bargain', 'Low Sample Price', 'New'];
  // public mockColors: string[] = ['grey', 'brown', 'violet', 'yellow', 'red', 'blue', 'green', 'orange', 'pink'];


  constructor(
    public sampleLicensingMarketService: SampleLicensingMarketService,
    public playStateControlService: PlayStateControlService,
    private audioService: AudioService,
    private loader: AppLoaderService,
    private changeDetectorRef: ChangeDetectorRef,
    private jwt: JwtAuthService,
    private ls: LocalStoreService,
    private audioWebService: AudioWebService,
    private licenseWebService: LicenseWebService,
    private fb: FormBuilder,
    private layout: LayoutService,
    private matchMedia: MatchMediaService,
    public dialog: MatDialog,
    private router: Router,
    private httpService: HttpService
  ) {

    this.matchMedia.onMediaChange.subscribe((data) => {
      console.log('Data');
      console.log(data);
    });


    this.sampleLicensingMarketService.samples$.pipe(
      map((samples: Array<Sample>) => {
        this.loader.close();
        this.audioService.initAudioPlayer(samples.map(sample => sample.audioUnit), Theme.ACCENT);
        return samples;
      }),
      takeUntil(this.sampleLicensingMarketService.sampleLicensingMarketDestroyed$),
    ).subscribe((samples: Array<Sample>) => {
      console.log(samples);
      if (samples.length > 0) {
        this.initCurrentFile(samples[0].audioUnit.audioUnitID);
      }
    });
    this.retrieveSamples();
  }

  public retrieveSamples(): void {
    const params = this.httpService.getRequestParams(this.sortBy, this.pageNo, this.pageSize);
    this.audioService.emitAudioUnitsLoading(true);
    this.sampleLicensingMarketService.initSamples(params).pipe(
      share(),
      map((res: SamplePage) => { return res })
    ).subscribe((response: SamplePage) => {
      console.log("Response");
      console.log(response);
      const { samples, totalItems } = response;
      this.count = totalItems;
      this.audioService.emitAudioUnitsLoading(false);
      this.sampleLicensingMarketService.samples$.next(samples);

    }, (error) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          this.ls.clear();
          this.jwt.signin();
        }
      }
      console.log(error);
    });
  }

  ngOnInit() {
    this.searchFilterFormMap.selectionFormMap = new Map<FormControl, Selection>();
    this.searchFilterFormMap.minMaxSliderFormMap = new Map<FormGroup, MinMaxSlider>();
    this.sampleLicensingMarketService.getFilterFormData().subscribe((filterFormMap) => {
      this.selectionList = filterFormMap.get('selection') as Array<Selection>;
      this.minMaxList = filterFormMap.get('minMaxSlider') as Array<MinMaxSlider>;
      this.initSearchFilterFormMap(this.selectionList, this.minMaxList);
    });
    this.audioService.emitAudioUnitsLoading(true);
    this.audioWebService.searchFilterSubject$.pipe(
      debounceTime(500)
    ).subscribe((response: SamplePage) => {
      this.responseReceived = true;
      console.log('Apply')
      const { samples, totalItems } = response;
      this.count = totalItems;
      this.audioService.emitAudioUnits(samples);
      this.audioService.emitAudioUnitsLoading(false);
      this.sampleLicensingMarketService.samples$.next(samples);
    }
    );

    this.audioService.audioState$.pipe(
      takeUntil(this.audioService.audioServiceDestroyed$)
    ).subscribe((state: AudioState) => {
      this.changeDetectorRef.detectChanges();
    });

    this.playStateControlService.playState$.pipe(
      takeUntil(this.playStateControlService.playStateServiceDestroyed$)
    ).subscribe((playState: boolean) => {
      this.playState = playState;
    });

    this.playStateControlService.currentSampleID$.pipe(
      takeUntil(this.playStateControlService.playStateServiceDestroyed$)
    ).subscribe((currentSampleID: string) => {
      this.currentSampleID = currentSampleID;
    });

    // this.sampleLicensingMarketService.getSelectionList().subscribe((selections: Array<Selection>) => {
    //   this.selections = selections;
    // });
    // this.sampleLicensingMarketService.getCategories().subscribe((categoryList: Array<string>) => {
    //   this.categoryList = categoryList;
    //   this.selections.push({
    //     contentList: categoryList,
    //     label: "categories",
    //     placeholder: "categories"
    //   })
    // });

    // this.sampleLicensingMarketService.getGenres().subscribe((genreList: Array<string>) =>{
    //   this.genreList = genreList;
    //   this.selections.push({
    //     contentList: categoryList,
    //     label: "categories",
    //     placeholder: "categories"
    //   })
    // });

    // this.sampleLicensingMarketService.getMoods().subscribe((moodsList: Array<string>) => {
    //   this.moodsList = moodsList;
    // });

    // this.genres$ = this.sampleLicensingMarketService.getGenres();
    // this.filterForm = this.buildFilterForm(this.sampleLicensingMarketService.initialFilters);
    this.searchForm = this.sampleLicensingMarketService.buildSearchForm();

  }


  ngAfterViewInit(): void {
    this.loader.open();
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

  // buildFilterForm(filterData: any = {}) {
  //   this.filterForm = this.fb.group({
  //     // search: [''],
  //     category: ['all'],
  //     genre: ['all'],
  //     minPrice: [filterData.minPrice],
  //     maxPrice: [filterData.maxPrice],
  //     minRating: [filterData.minRating],
  //     maxRating: [filterData.maxRating]
  //   });
  // }

  // public buildFilterForm(filterData: any = {}): FormGroup {
  //   return this.fb.group({
  //     'categories': [this.categoryList, []],
  //     'genres': [this.genreList, []],
  //     'moods': [this.moodsList, []],
  //     'tempo': this.fb.group({
  //       'minTempo': [filterData.minTempo],
  //       'maxTempo': [filterData.maxTempo],
  //     }),
  //     'lep': this.fb.group({
  //       'minLep': [filterData.minLep],
  //       'maxLep': [filterData.maxLep]
  //     }),
  //   });
  // }

  // buildSearchForm() {
  //   this.searchForm = this.fb.group({
  //     search: ['']
  //   });
  // }

  // ngOnDestroy(): void {
  //   this.playStateControlService.emitPlayState(false);
  // }

  // changeGenres(genres) {
  //   if (genres.length === 0) {
  //     this.selectedGenres = this.genreList;
  //   } else {
  //     this.selectedGenres = genres;
  //   }
  // }

  // changeRegions(regions) {
  //   if (regions.length === 0) {
  //     this.selectedRegions = this.regionList;
  //   } else {
  //     this.selectedRegions = regions;

  //   }
  // }

  // changeTrackTypes(trackTypes) {
  //   if (trackTypes.length === 0) {
  //     this.selectedTrackTypes = this.trackTypeList;
  //   } else {
  //     this.selectedTrackTypes = trackTypes;
  //   }
  // }

  // changeSongKeys(songKeys) {
  //   if (songKeys.length === 0) {
  //     this.selectedSongKeys = this.songKeyList;
  //   } else {
  //     this.selectedSongKeys = songKeys;
  //   }
  // }





  // setActiveCategory(category) {
  //   this.activeCategory = category;
  //   this.filterForm.controls['category'].setValue(category);
  // }

  // setActiveGenre(genre: string) {
  //   this.activeGenre = genre;
  //   this.filterForm.controls['genre'].setValue(genre);
  // }




  initCurrentFile(audioUnitID: string) {
    // this.playStateControlService.saveIDCurrentPlayElement(sampleID);
    this.playStateControlService.emitCurrentSampleID(audioUnitID);
  }


  getCurrentTime(): number {
    if (this.audioService.isPlayerReady) {
      // this.changeDetectorRef.markForCheck();
      return this.audioService.getCurrentTime();
    } else {
      return 0;
    }
  }

  getDuration(): number {
    if (this.audioService.isPlayerReady) {
      // this.changeDetectorRef.markForCheck();
      return this.audioService.getDuration();
    } else {
      return 100;
    }
  }

  currentTimeFallback(): number {
    return 0;
  }

  durationFallback(): number {
    return 100;
  }

  onSliderChangeEnd(changeEvent: MatSliderChange) {
    this.audioService.seekTo(changeEvent.source.percent);

  }


  // searchMusicByFormInput(searchString: string) {
  //   this.sampleLicensingMarketService.searchAudioByFormInput(searchString);
  // }

  // searchMusicByFormSubmit(searchString: string) {
  //   if (searchString.length === 0) {
  //     return;
  //   }
  //   this.blurSearchInput();
  //   const sampleIDs: number[] = [];
  //   this.sampleLicensingMarketService.sampleSearchQueries.forEach((query) => {

  //     sampleIDs.push(query.id);
  //   });
  //   this.loader.open();
  //   this.sampleLicensingMarketService.searchMusicByFormSubmit(sampleIDs);
  // }


  // searchSingleAudio(sampleID: number) {
  //   this.blurSearchInput();
  //   const sampleIDs: number[] = [];
  //   sampleIDs.push(sampleID);
  //   this.loader.open();
  //   this.sampleLicensingMarketService.searchMusicByFormSubmit(sampleIDs);
  // }


  // blurSearchInput() {
  //   this.searchInput.nativeElement.blur();
  // }





  get playState(): boolean {
    return this._playState;
  }

  get currentSampleID(): string {
    return this._currentSampleID;
  }

  set playState(playState: boolean) {
    this._playState = playState;
  }

  set currentSampleID(currentSampleID: string) {
    this._currentSampleID = currentSampleID;
  }



  public openFilter() {
    this.sampleLicensingMarketService.toggleFilter$.next({ toggleState: true, apply: SidenavContent.Filter });
  }

  handlePageChange(pageNo: number) {
    console.log(pageNo);
    this.pageNo = pageNo;
    this.applyFilter(this.pageNo - 1, this.searchFilterFormMap);
    // this.retrieveSamples();
  }

  changePage(pageNo: number) {
    this.pageNo = pageNo;
    this.initSearchFilterFormMap(this.selectionList, this.minMaxList);

  }

  changeCount(count: number) {
    this.count = count;
  }

  changeSearchString(searchString: string) {
    this.searchString = searchString;
    // this.applyFilter(this.searchFilterFormMap);
  }

  toggleFilter(isFilterOpen: boolean) {
    this.isFilterOpen = isFilterOpen;
  }

  public toggleSidenav() {
    this.layout.toggleSidenav();
    // setTimeout(() => {
    //   this.changeDetectorRef.detectChanges();
    // }, 1000);
    // this.sideNav.opened = !this.sideNav.opened;
  }

  public applyFilter(pageNo: number, searchFilterFormMap?: SearchFilterFormMap) {
    if (searchFilterFormMap) {
      this.searchFilterFormMap = searchFilterFormMap;
    }
    // const paginationRequestParams: PaginationRequestParams = ;
    // {
    //   sortBy: this.sortBy,
    //   pageNo: 0,
    //   pageSize: this.pageSize
    // }
    this.responseReceived = false;
    // (this.searchForm.controls['search'] as FormControl).value.title as string
    this.audioWebService.applySearchFilter(this.searchString, this.searchFilterFormMap, AudioUnitType.Sample ,new PaginationRequestParams(this.sortBy, pageNo, this.pageSize));
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

  downloadBasicLicense(sample: Sample) {
    console.log(sample);
    this.loader.open();
    this.licenseWebService.getBasicLicense(sample).subscribe(data => {
      this.loader.close();
      // console.log(data);
      const dialogRef = this.dialog.open(SimpleDialogComponent, {
        width: '550px',
        // data: {name: this.name, animal: this.animal}
        data: {
          title: 'Congratulations!',
          firstParagraph: `Now you own a Basic License for ${sample.audioUnit.title} by ${sample.audioUnit.artistAlias.artistName}.`,
          submitButton: 'Manage Samples',
          // route: ''
          cancelButton: 'Keep digging'
        },
        // data: this.formsMap.get(item).controls['mixedIns'].value,
        hasBackdrop: false
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.router.navigate(['profile', 'my-licenses', 'basic-licenses']);

        // this.animal = result;
      });
    }, (httpErrorResponse: HttpErrorResponse) => {
      this.loader.close();
      console.log(httpErrorResponse);
      if (httpErrorResponse.error.status === 400) {

      }

      switch (httpErrorResponse.error.status as Number) {
        case 400:
          const dialogRef = this.dialog.open(SimpleDialogComponent, {
            width: '550px',
            // data: {name: this.name, animal: this.animal}
            data: {
              title: 'Not Working!',
              firstParagraph: httpErrorResponse.error.message,
              // submitButton: 'Keep digging',
              // route: ''
              cancelButton: 'Keep digging'
            },
            // data: this.formsMap.get(item).controls['mixedIns'].value,
            hasBackdrop: true
          });
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            // this.animal = result;
          });
          break;
      }
      // window.alert(JSON.stringify(error));
    });
  }


}
