import { CloudService } from './../../shared/services/cloud-service.service';
import { Injectable, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductDB } from 'app/shared/inmemory-db/products';
import { Product } from 'app/shared/models/product.model';
import { combineLatest, throwError as observableThrowError, Observable, Subject, BehaviorSubject, empty, EMPTY } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { delay } from 'rxjs/internal/operators/delay';
import { map } from 'rxjs/internal/operators/map';
import { debounceTime, share, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { Sample } from 'app/shared/models/sample.model';
import { defaultIfEmpty } from 'rxjs-compat/operator/defaultIfEmpty';
import { SampleSearchQuery } from 'app/shared/models/sample-search-query.model';
import { SidenavContent } from 'app/shared/models/sidenav-content.model';

// throwError as observableThrowError
export interface CartItem {
  product: Product;
  data: {
    quantity: number,
    options?: any
  };
}




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
  public samples$: Subject<Sample[]> = new Subject<Sample[]>();
  public sampleSearchQueries$: Observable<any>;

  public sampleSearchQueries: SampleSearchQuery[];
  private samples: Sample[];
  public products: Product[] = [];
  public initialFilters = {
    minPrice: 10,
    maxPrice: 40,
    minRating: 1,
    maxRating: 5
  };
  // public intialSidenavData : RightSidenavData =  {

  // }
  public cart: CartItem[] = [];
  public cartData = {
    itemCount: 0
  }
  constructor(private cloudService: CloudService) {
    // this.samples$ = this.getAudioFiles().pipe(
    //   share(),
    // );
    // this.getAudioFiles().pipe(
    //   share(),
    // ).subscribe((samples: Sample[]) => {
    //   this.samples$.next(samples);
    // });
    // this.sampleSearchQueries$ = of({});
  }

  ngOnDestroy(): void {
    this.sampleLicensingMarketDestroyed$.next();
  }

  emitSamplesLoading(value: boolean) {
    this.samplesLoading$.next(value);
  }


  public getCart(): Observable<CartItem[]> {
    return of(this.cart)
  }
  public addToCart(cartItem: CartItem): Observable<CartItem[]> {
    let index = -1;
    this.cart.forEach((item, i) => {
      if (item.product._id === cartItem.product._id) {
        index = i;
      }
    })
    if (index !== -1) {
      this.cart[index].data.quantity += cartItem.data.quantity;
      this.updateCount();
      return of(this.cart)
    } else {
      this.cart.push(cartItem);
      this.updateCount();
      return of(this.cart)
    }
  }
  private updateCount() {
    this.cartData.itemCount = 0;
    this.cart.forEach(item => {
      this.cartData.itemCount += item.data.quantity;
    })
  }
  public removeFromCart(cartItem: CartItem): Observable<CartItem[]> {
    this.cart = this.cart.filter(item => {
      if (item.product._id == cartItem.product._id) {
        return false;
      }
      return true;
    });
    this.updateCount();
    return of(this.cart)
  }

  public getProducts(): Observable<Product[]> {
    let productDB = new ProductDB();
    return of(productDB.products)
      .pipe(
        delay(500),
        map((data: Product[]) => {
          this.products = data;
          return data;
        })
      )
  }
  public getProductDetails(productID): Observable<Product> {
    let productDB = new ProductDB();
    let product = productDB.products.filter(p => p._id === productID)[0];
    if (!product) {
      return observableThrowError(new Error('Product not found!'));
    }
    return of(product)
  }

  public getAudioFiles(): Observable<Sample[]> {
    this.emitSamplesLoading(true);
    return this.cloudService.getAudioFiles().pipe(
      map(serverFiles => {
        console.log(serverFiles.audioFileResponse);
        this.emitSamplesLoading(false);
        return serverFiles.audioFileResponse;
      })
    );
  }

  public searchAudioByFormInput(searchString: string): void {
    this.sampleSearchQueries$ = this.cloudService.searchAudioByFormInput(searchString).pipe(map((data: any) => data.sampleSearchQueries));
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
    this.cloudService.searchMultipleAudio(sampleIDs).pipe(
      map((data:any) => data.audioFileResponse),
      delay(2000),
      share()
    ).subscribe((samples: Sample[]) => {
      this.samples$.next(samples);
    });
  }


  public applyFilter() {
    
  }

  // setSamples(samples: Sample[]): void {
  //   this.samples = samples;
  // }

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


  public getFilteredProduct(filterForm: FormGroup): Observable<Product[]> {
    return combineLatest(
      this.getProducts(),
      filterForm.valueChanges
        .pipe(
          startWith(this.initialFilters),
          debounceTime(400)
        )
    )
      .pipe(
        switchMap(([products, filterData]) => {
          return this.filterProducts(products, filterData);
        })
      )
  }
  /*
  * If your data set is too big this may raise performance issue.
  * You should implement server side filtering instead.
  */
  private filterProducts(products: Product[], filterData): Observable<Product[]> {
    let filteredProducts = products.filter(p => {
      let isMatch: Boolean;
      let match = {
        search: false,
        caterory: false,
        price: false,
        rating: false
      };
      // Search
      if (
        !filterData.search
        || p.name.toLowerCase().indexOf(filterData.search.toLowerCase()) > -1
        || p.description.indexOf(filterData.search) > -1
        || p.tags.indexOf(filterData.search) > -1
      ) {
        match.search = true;
      } else {
        match.search = false;
      }
      // Category filter
      if (
        filterData.category === p.category
        || !filterData.category
        || filterData.category === 'all'
      ) {
        match.caterory = true;
      } else {
        match.caterory = false;
      }
      // Price filter
      if (
        p.price.sale >= filterData.minPrice
        && p.price.sale <= filterData.maxPrice
      ) {
        match.price = true;
      } else {
        match.price = false;
      }
      // Rating filter
      if (
        p.ratings.rating >= filterData.minRating
        && p.ratings.rating <= filterData.maxRating
      ) {
        match.rating = true;
      } else {
        match.rating = false;
      }

      for (let m in match) {
        if (!match[m]) return false;
      }

      return true;
    })
    return of(filteredProducts)
  }
}
