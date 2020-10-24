import { filter } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Product } from '../../../shared/models/product.model';
// import { SampleLicensingMarketService, CartItem } from '../../shop/shop.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem, SampleLicensingMarketService } from '../sample-licensing-market.service';

@Component({
  selector: 'app-basic-licenses',
  templateUrl: './basic-licenses.component.html',
  // styleUrls: ['./basic-licenses.component.scss'],
  animations: [egretAnimations]
})
export class BasicLicensesComponent implements OnInit {

  public isSideNavOpen: boolean;
  public viewMode: string = 'grid-view';
  public currentPage: any;
  @ViewChild(MatSidenav) private sideNav: MatSidenav;

  public products$: Observable<Product[]>;
  public categories$: Observable<any>;
  public activeCategory: string = 'all';
  public filterForm: FormGroup;
  public cart: CartItem[];
  public cartData: any;

  constructor(
    private sampleLicensingMarketService: SampleLicensingMarketService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private loader: AppLoaderService
  ) { }

  ngOnInit() {
    this.categories$ = this.sampleLicensingMarketService.getCategories();
    this.buildFilterForm(this.sampleLicensingMarketService.initialFilters);
    
    setTimeout(() => {
      this.loader.open();
    });
    this.products$ = this.sampleLicensingMarketService
      .getFilteredProduct(this.filterForm)
      .pipe(
        map(products => {
          this.loader.close();
          return products;
        })
      );
    this.getCart();
    this.cartData = this.sampleLicensingMarketService.cartData;
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

  buildFilterForm(filterData:any = {}) {
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

}
