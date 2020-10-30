import { ComponentCommunicationService } from './../../../shared/services/component-communication.service';
import { AudioService } from './../../../shared/services/audio.service';
import { takeUntil } from 'rxjs/operators';
import { StateManagerService } from './../../../shared/services/state-manager.service';
import { PlayStateControlService } from './../../../shared/services/play-state-control.service';
import { QueryList, ViewChildren, Renderer2, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CloudService } from './../../../shared/services/cloud-service.service';
import { filter, withLatestFrom } from 'rxjs/operators';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Product } from '../../../shared/models/product.model';
// import { SampleLicensingMarketService, CartItem } from '../../shop/shop.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem, SampleLicensingMarketService } from '../sample-licensing-market.service';
import { Sample } from 'app/shared/models/sample.model';
import { rendererTypeName } from '@angular/compiler';
import { AudioState } from 'app/shared/models/audio-state.model';
import { MatSlider } from '@angular/material/slider';


@Component({
  selector: 'app-basic-licenses',
  templateUrl: './basic-licenses.component.html',
  // styleUrls: ['./basic-licenses.component.scss'],
  animations: [egretAnimations]
})
export class BasicLicensesComponent implements OnInit, AfterViewInit {

  public isSideNavOpen: boolean;
  public viewMode: string = 'grid-view';
  public currentPage: any;
  @ViewChild(MatSidenav) private sideNav: MatSidenav;
  @ViewChildren('audioSlider', { read: MatSlider }) private sliders: QueryList<MatSlider>;
  @ViewChild('featuredImage', { static: false, read: ElementRef }) private featuredImage: ElementRef;
  @ViewChildren('playButton', { read: ElementRef }) private playButtons: QueryList<ElementRef>;

  public products$: Observable<Product[]>;
  public samples$: Observable<Sample[]>;
  // sampleSubscription: Subscription;
  public categories$: Observable<any>;
  public activeCategory: string = 'all';
  public filterForm: FormGroup;
  public cart: CartItem[];
  public cartData: any;
  samplesSubscription: Subscription;
  private audioStateSubscription: Subscription;
  samples: Sample[];
  currentTime: number;
  duration: number;

  constructor(
    private sampleLicensingMarketService: SampleLicensingMarketService,
    public playStateControlService: PlayStateControlService,
    private stateManagerService: StateManagerService,
    private compCommService: ComponentCommunicationService,
    private audioService: AudioService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private loader: AppLoaderService,
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef

  ) {
    this.audioStateSubscription = this.audioService.audioState$.subscribe((state: AudioState) => {
      switch (state.status) {
        case "finish":
          this.currentTime = state.currentTime;
          // this.changeToPlayViewFromContents();
          // this.playStateControlService.savePlayState(false);
          // this.componentCommunicationService.emitChangeFromPlayer(this.playStateControlService.getPlayState());
          this.changeDetectorRef.detectChanges();
          break;
        case "playing":
          this.currentTime = state.currentTime;
          this.duration = state.duration;
          this.changeDetectorRef.detectChanges();
          break;
      }
    });
    // this.compCommService.audioLoadCompleteEvent$.subscribe(()=> {
    //   this.audioService.loadPlayAudio(this.samples[0].id, this.samples[0].audioFile);
    // })

  }

  ngOnInit() {
    this.categories$ = this.sampleLicensingMarketService.getCategories();
    this.buildFilterForm(this.sampleLicensingMarketService.initialFilters);

    setTimeout(() => {
      this.loader.open();
    });

    this.samples$ = this.sampleLicensingMarketService.getAudioFiles().pipe(
      map(audioFileResponse => {
        this.loader.close();
        // this.stateManagerService.initCurrentFile();
        this.audioService.loadPlayAudio(audioFileResponse[0].id, audioFileResponse[0].audioFile);
        console.log(audioFileResponse);
        // for(let i = 0; i < audioFileResponse.length; i++) {
        //   audioFileResponse[i].id = i.toString();
        // }

        return audioFileResponse;
      })
    );
    this.samples$.subscribe((samples) => {
      this.samples = samples;
      console.log(samples[0].sampleID);
      // this.initCurrentFile();
    });
    // this.sampleLicensingMarketService.getAudioFiles().subscribe(data => {
    //   console.log(data);
    //   this.loader.close();
    // })
    // this.products$ = this.sampleLicensingMarketService
    //   .getFilteredProduct(this.filterForm)
    //   .pipe(
    //     map(products => {
    //       this.loader.close();
    //       return products;
    //     })
    //   );
    this.getCart();
    this.cartData = this.sampleLicensingMarketService.cartData;
  }


  ngAfterViewInit(): void {
    this.samples$.subscribe((audioFileResponse)=> {
      this.initCurrentFile();
      console.log(this.sliders);
    });

  }

  ngOnDestroy() {

  }
  getCart() {
    this.sampleLicensingMarketService
      .getCart()
      .subscribe(cart => {
        this.cart = cart;
      })
  }
  addToCart(product) {
    let cartItem: CartItem = {
      product: product,
      data: {
        quantity: 1
      }
    };
    this.sampleLicensingMarketService
      .addToCart(cartItem)
      .subscribe(cart => {
        this.cart = cart;
        this.snackBar.open('Product added to cart', 'OK', { duration: 4000 });
      })
  }

  buildFilterForm(filterData: any = {}) {
    this.filterForm = this.fb.group({
      search: [''],
      category: ['all'],
      minPrice: [filterData.minPrice],
      maxPrice: [filterData.maxPrice],
      minRating: [filterData.minRating],
      maxRating: [filterData.maxRating]
    })
  }
  setActiveCategory(category) {
    this.activeCategory = category;
    this.filterForm.controls['category'].setValue(category)
  }

  toggleSideNav() {
    this.sideNav.opened = !this.sideNav.opened;
  }

  togglePlayPause(sample: Sample) {
    console.log(sample.id);
    console.log('playState' + this.playStateControlService.getPlayState())
    if (this.playStateControlService.getPlayState() && this.playStateControlService.getIDCurrentPlayElement() === JSON.stringify(sample.sampleID)) {
      this.playStateControlService.savePlayState(false);
      this.audioService.pause();
      // this.audioService.pause();
      // this.removeClassCurrentPlayElement();
    } else if (this.playStateControlService.getPlayState() && this.playStateControlService.getIDCurrentPlayElement() !== JSON.stringify(sample.sampleID)) {

      this.audioService.loadPlayAudio(sample.id, sample.audioFile);
      this.removeClassCurrentPlayElement();
      this.addClassCurrentPlayElement(JSON.stringify(sample.sampleID));
    } else if (!this.playStateControlService.getPlayState() && this.playStateControlService.getIDCurrentPlayElement() === JSON.stringify(sample.sampleID)) {
      // this.removeClassCurrentPlayElement();
      // this.addClassCurrentPlayElement(id);
      this.audioService.play();
      this.playStateControlService.savePlayState(true);
    } else {
      this.audioService.loadPlayAudio(sample.id, sample.audioFile);
      this.playStateControlService.savePlayState(true);
      this.removeClassCurrentPlayElement();
      this.addClassCurrentPlayElement(JSON.stringify(sample.sampleID));
    }
    // this.audioService.emitAudioFile();
    // this.playerViewService.changeCurrentPlayElement(event);
  }

  initCurrentFile() {
    if (Object.keys(this.playStateControlService.getCurrentFile()).length === 0) {
      console.log(this.samples);
      this.playStateControlService.saveIDCurrentPlayElement(this.samples[0].sampleID);
      // this.playStateControlService.updateCurrentFile(this.samples[0], 0);
    }
    console.log(this.playButtons.toArray());
    setTimeout(() => {
      this.addClassCurrentPlayElement(JSON.stringify(this.samples[0].sampleID));
    }, 0);
  }

  removeClassCurrentPlayElement() {
    console.log(this.playButtons.find(b => b.nativeElement.classList.contains('current-play-element')));
    const playButton: ElementRef = this.playButtons.find((b) => (b.nativeElement as HTMLElement).classList.contains('current-play-element'));
    this.renderer.removeClass(playButton.nativeElement, 'current-play-element');
  }

  addClassCurrentPlayElement(id: string) {
    console.log(this.playButtons);
    const playButton: ElementRef = this.playButtons.find((b) =>
      // const bool: boolean = b.nativeElement.id === id;
      b.nativeElement.id === id);
    this.renderer.addClass(playButton.nativeElement, 'current-play-element');
    this.playStateControlService.saveIDCurrentPlayElement(id);
  }




}
