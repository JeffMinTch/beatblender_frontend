import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { LocalStoreService } from 'app/shared/services/local-store.service';
import { SampleLicensingMarketService } from 'app/views/licensing/sample-licensing-market.service';
import { share } from 'rxjs/operators';

@Component({
  selector: 'app-finances-overview',
  templateUrl: './finances-overview.component.html',
  styleUrls: ['./finances-overview.component.scss'],
  animations: [egretAnimations],

})
export class FinancesOverviewComponent implements OnInit {


  page: number = 1;
  pageSize: number = 12;
  sortBy: string = 'title';
  count:number = 0;
  vat: number = 16;
  subTotal: number = 0;
  total: number = 0;


  constructor(
    public sampleLicensingMarketService: SampleLicensingMarketService,
    private jwt: JwtAuthService,
    private ls: LocalStoreService,
  ) { }

  ngOnInit(): void {
    this.retrieveSamples();

  }

  public retrieveSamples(): void {
    const params = this.sampleLicensingMarketService.getRequestParams(this.sortBy, this.page, this.pageSize);
    this.sampleLicensingMarketService.initSamples(params).pipe(
      share(),
    ).subscribe((response) => {
      console.log("Response");
      console.log(response);
      const { samples, totalItems } = response;
      this.count = totalItems;
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

  removeProduct(value: any) {

  }

}
