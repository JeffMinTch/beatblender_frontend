import { LocalStoreService } from './../../../shared/services/local-store.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { LayoutService } from './../../../shared/services/layout.service';
import { SampleSearchQuery } from 'app/shared/models/sample-search-query.model';
import { ComponentCommunicationService } from './../../../shared/services/component-communication.service';
import { AudioService } from './../../../shared/services/audio.service';
import { delay, share, takeUntil } from 'rxjs/operators';
import { PlayStateControlService } from './../../../shared/services/play-state-control.service';
import { QueryList, ViewChildren, Renderer2, AfterViewInit, ChangeDetectorRef, AfterViewChecked, ChangeDetectionStrategy, ViewEncapsulation, HostListener, OnDestroy } from '@angular/core';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SampleLicensingMarketService } from '../sample-licensing-market.service';
import { Sample } from 'app/shared/models/sample.model';
import { AudioState } from 'app/shared/models/audio-state.model';
import { MatSlider, MatSliderChange } from '@angular/material/slider';
import { CloudService } from 'app/shared/services/cloud-service.service';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatOption, MatOptionSelectionChange } from '@angular/material/core';
import { SidenavContent } from 'app/shared/models/sidenav-content.model';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-basic-licenses',
  templateUrl: './basic-licenses.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [egretAnimations],
  // tslint:disable-next-line:use-component-view-encapsulation
  encapsulation: ViewEncapsulation.None
})
export class BasicLicensesComponent implements OnInit, AfterViewInit {

  public isSideNavOpen: boolean;
  public viewMode = 'grid-view';
  public currentPage: any;
  @ViewChild(MatSidenav) private sideNav: MatSidenav;
  @ViewChildren('audioSlider', { read: MatSlider }) private audioSliders: QueryList<MatSlider>;
  @ViewChild('featuredImage', { static: false, read: ElementRef }) private featuredImage: ElementRef;
  @ViewChildren('.mat-slider-track-background', { read: ElementRef }) private matSliderTrackBackground: QueryList<ElementRef>;
  @ViewChild('searchInput', { static: false, read: ElementRef }) private searchInput: ElementRef;
  @ViewChild('searchInputTrigger', { static: false, read: MatAutocompleteTrigger }) private matSearchInputTrigger: MatAutocompleteTrigger;
  @ViewChild('auto', { static: false, read: MatAutocomplete }) private matAutoComplete: MatAutocomplete;


  private _playState: boolean;
  private _currentSampleID: string;
  public categories$: Observable<any>;
  public genres$: Observable<string[]>;
  public activeCategory = 'all';
  public activeGenre = 'all';
  // public activeGenre: string ='all;'
  public filterForm: FormGroup;
  public sampleSearchQueries: SampleSearchQuery[];
  public selectedSearchOption: MatOption = null;
  currentTime: number;
  duration: number;

  selectedGenres: string[];
  selectedRegions: string[];
  selectedTrackTypes: string[];
  selectedSongKeys: string[];

  // tslint:disable-next-line:max-line-length
  // public genreList: string[] = ['Blues', 'Classical', 'Country', 'Electronic', 'Hip Hop/Rap', 'Jazz', 'Latin', 'Pop', 'RnB/Soul', 'Reggea', 'Rock', 'Spoken Word'];
  public regionList: string[] = ['Northern Europe', 'Western Europe', 'Southern Europe', 'Eastern Europe', 'Middle East', 'Caribbean', 'Oceania, Pacific', 'Southern Africa', 'Northern Africa', 'Western Africa', 'Eastern Africa', 'South Asia/India', 'East Asia', 'North America', 'South America', 'Central America'];
  public trackTypeList: string[] = ['Accordion', 'Bass', 'Drum', 'Edits', 'Flute', 'FX track', 'Guitar', 'Horns', 'Instrumental', 'Keyborads', 'Master', 'Percussion', 'Shruti Box', 'Sound FX', 'Strings', 'Vocals', 'Whistle'];
  public songKeyList: string[] = ['A major', 'A minor', 'A flat major', 'A flat minor', 'B major', 'B minor', 'B flat major', 'B flat minor', 'C major', 'C minor', 'D major', 'D minor', 'D flat major', 'D flat minor', 'E major', 'E minor', 'E flat major', 'E flat minor', 'F major', 'F minor', 'G major', 'G minor', 'G flat major', 'G flat minor'];
  public bpmMinMaxValues: string[];
  public yearMinMaxValues: string[];


  public mockCategories: string [] = ['Trending', 'New', 'Low Sample Price', 'Bargain', 'High Option Price', 'Trending', 'Bargain', 'Low Sample Price', 'New'];
  public mockColors: string [] = ['grey', 'brown', 'violet', 'yellow', 'red', 'blue', 'green', 'orange', 'pink'];

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.matSearchInputTrigger.closePanel();
  }

  constructor(
    public sampleLicensingMarketService: SampleLicensingMarketService,
    public playStateControlService: PlayStateControlService,
    private audioService: AudioService,
    private cloudService: CloudService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private loader: AppLoaderService,
    private changeDetectorRef: ChangeDetectorRef,
    private jwt: JwtAuthService,
    private ls: LocalStoreService
  ) {


    this.sampleLicensingMarketService.samples$.pipe(
      map((samples: Sample[]) => {
        this.audioService.createWavesurferObj();
        // if(!this.audioService.wavesurfer) {
        // }
        // this.audioService.createWavesurferObj();
        // this.audioService.wavesurfer.on("ready", () => {
          this.loader.close();
          (this.searchInput.nativeElement as HTMLInputElement).value = '';
          this.matSearchInputTrigger.closePanel();
          this.selectedSearchOption = null;
          if (this.playState) {
            this.playStateControlService.emitPlayState(false);
          }
          this.audioService.loadPlayAudio(samples[0].sampleID);
          // this.audioService.wavesurfer.un("ready");
        // });

        return samples;
      }),
      takeUntil(this.sampleLicensingMarketService.sampleLicensingMarketDestroyed$),
    ).subscribe((samples: Sample[]) => {
      this.initCurrentFile(samples[0].sampleID);
    });

    this.audioService.audioState$.pipe(takeUntil(this.audioService.audioServiceDestroyed$)).subscribe((state: AudioState) => {
      switch (state.status) {
        case 'finish':
          this.changeDetectorRef.detectChanges();
          break;
        case 'playing':
          break;
        case 'pause':
          this.changeDetectorRef.detectChanges();
          break;
      }
    });
      this.sampleLicensingMarketService.getAudioFiles().pipe(
        share(),
      ).subscribe((samples: Sample[]) => {
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
    this.categories$ = this.sampleLicensingMarketService.getCategories();
    this.genres$ = this.sampleLicensingMarketService.getGenres();
    this.buildFilterForm(this.sampleLicensingMarketService.initialFilters);

    // setTimeout(() => {
    //   // if(!this.audioService.wavesurfer) {
    //     this.audioService.createWavesurferObj();
    //   // }
    // });

    this.audioService.audioState$.pipe(
      takeUntil(this.audioService.audioServiceDestroyed$)
    ).subscribe((state: AudioState) => {
      this.changeDetectorRef.detectChanges();
    });

    this.playStateControlService.playState$.pipe(
      takeUntil(this.playStateControlService.playStateServiceDestroyed$)
    ).subscribe((playState: boolean) => {
      this.playState = playState;
      // this.changeDetectorRef.detectChanges();
    });

    this.playStateControlService.currentSampleID$.pipe(
      takeUntil(this.playStateControlService.playStateServiceDestroyed$)
    ).subscribe((currentSampleID: string) => {
      this.currentSampleID = currentSampleID;
      // this.changeDetectorRef.detectChanges();
    });
    // setTimeout(() => {
      // });
    }


    ngAfterViewInit(): void {
      // this.layoutService.layoutConf.footerFixed = true;
      this.loader.open();
      // throw new Error('Method not implemented.');
    }

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

  changeRegions(regions) {
    if (regions.length === 0) {
      this.selectedRegions = this.regionList;
    } else {
      this.selectedRegions = regions;

    }
  }

  changeTrackTypes(trackTypes) {
    if (trackTypes.length === 0) {
      this.selectedTrackTypes = this.trackTypeList;
    } else {
      this.selectedTrackTypes = trackTypes;
    }
  }

  changeSongKeys(songKeys) {
    if (songKeys.length === 0) {
      this.selectedSongKeys = this.songKeyList;
    } else {
      this.selectedSongKeys = songKeys;
    }
  }



  buildFilterForm(filterData: any = {}) {
    this.filterForm = this.fb.group({
      search: [''],
      category: ['all'],
      genre: ['all'],
      minPrice: [filterData.minPrice],
      maxPrice: [filterData.maxPrice],
      minRating: [filterData.minRating],
      maxRating: [filterData.maxRating]
    });
  }

  setActiveCategory(category) {
    this.activeCategory = category;
    this.filterForm.controls['category'].setValue(category);
  }

  setActiveGenre(genre: string) {
    this.activeGenre = genre;
    this.filterForm.controls['genre'].setValue(genre);
  }

  toggleSideNav() {
    this.sideNav.opened = !this.sideNav.opened;
  }

  play(isCurrentSample: boolean, sampleID: string): void {
    if (isCurrentSample) {
      this.playStateControlService.emitPlayState(true);
      this.audioService.play();
      console.log('play yes');
    } else {
      this.playStateControlService.emitPlayState(true);
      this.audioService.loadPlayAudio(sampleID);
      // setTimeout(() => {
        this.playStateControlService.emitCurrentSampleID(sampleID);
      // });
      console.log('play no');
    }
  }

  pause(isCurrentSample: boolean, sampleID: string): void {
    if (isCurrentSample) {
      this.playStateControlService.emitPlayState(false);
      this.audioService.pause();
      console.log('pause yes');
    } else {
      this.playStateControlService.emitCurrentSampleID(sampleID);
      this.audioService.loadPlayAudio(sampleID);
      console.log('pause no');

    }

  }

  initCurrentFile(sampleID: string) {
    // this.playStateControlService.saveIDCurrentPlayElement(sampleID);
    this.playStateControlService.emitCurrentSampleID(sampleID);
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


  searchMusicByFormInput(searchString: string) {
    this.sampleLicensingMarketService.searchAudioByFormInput(searchString);
  }

  searchMusicByFormSubmit(searchString: string) {
    if (searchString.length === 0) {
      return;
    }
    this.blurSearchInput();
    const sampleIDs: number[] = [];
    this.sampleLicensingMarketService.sampleSearchQueries.forEach((query) => {
      sampleIDs.push(query.id);
    });
    this.loader.open();
    this.sampleLicensingMarketService.searchMusicByFormSubmit(sampleIDs);
  }


  searchSingleAudio(sampleID: number) {
    this.blurSearchInput();
    const sampleIDs: number[] = [];
    sampleIDs.push(sampleID);
    this.loader.open();
    this.sampleLicensingMarketService.searchMusicByFormSubmit(sampleIDs);
  }


  blurSearchInput() {
    this.searchInput.nativeElement.blur();
  }

  changeSelectedSample(event: MatOptionSelectionChange, sampleID: number) {
    // angular bug fix. Event fires multiple times: https://github.com/angular/components/issues/4094
    if (event.source.selected) {
      this.selectedSearchOption = event.source;
    }
  }

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

  public displaySearchQuery(sampleSearchQuery: SampleSearchQuery): string {
    if (sampleSearchQuery) {
      return sampleSearchQuery.sampleTitle + ' ' + '(' + sampleSearchQuery.artistName + ')';

    } else {
      return '';
    }
  }

  public openFilter() {
    this.sampleLicensingMarketService.toggleFilter$.next({toggleState: true, apply: SidenavContent.Filter});
  }


}
