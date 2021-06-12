import { LicenseWebService } from './../../../services/web-services/license-web.service';
import { element } from 'protractor';
import { Sample } from './../../../models/sample.model';
import { ChangeDetectionStrategy, ChangeDetectorRef, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { SampleLicensingMarketService } from './../../../../views/licensing/sample-licensing-market.service';
import { Component, Inject, OnInit, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { share } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { LocalStoreService } from 'app/shared/services/local-store.service';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { number } from 'ngx-custom-validators/src/app/number/validator';
import { Subject } from 'rxjs';
import { PaginationRequestParams } from 'app/shared/models/pagination-request-params.model';
import { BasicLicense } from 'app/shared/models/basic-license.model';

@Component({
  selector: 'app-select-mixedins-dialog',
  templateUrl: './select-mixedins-dialog.component.html',
  styleUrls: ['./select-mixedins-dialog.component.scss'],
  animations: [egretAnimations],

})
export class SelectMixedinsDialogComponent implements OnInit, AfterViewInit {

  // @ViewChildren('appCheckbox', { read: MatCheckbox }) checkboxList: QueryList<MatCheckbox>;

  page: number = 1;
  pageSize: number = 12;
  sortBy: string = 'title';
  count: number = 0;

  private paginationRequestParams: PaginationRequestParams;

  public basicLicenseSubject$: Subject<Array<BasicLicense>> = new Subject<Array<BasicLicense>>();



  constructor(public dialogRef: MatDialogRef<SelectMixedinsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public sampleLicensingMarketService: SampleLicensingMarketService,
    private jwt: JwtAuthService,
    private ls: LocalStoreService,
    private licenseWebService: LicenseWebService
    // public cdr: ChangeDetectorRef
  ) { }
  
  ngOnInit(): void {
    this.paginationRequestParams = new PaginationRequestParams('title', 1, 12,);
    // this.sampleLicensingMarketService.samples$.subscribe(samples => {
    //   this.initCheckboxes();

    // });
    
  }
  ngAfterViewInit(): void {
    // this.retrieveSamples();
    this.fetchAllBasicLicenses();
    // let that = this;
    // setTimeout(() => {
    // }, 1000);
    // console.log(this.checkboxList);
  }

  onNoClick(): void {
    this.dialogRef.close(this.data);
  }

  public fetchAllBasicLicenses(): void {
    this.licenseWebService.getAllBasicLicense().subscribe((basicLicenses: Array<BasicLicense>) => {
      // const samples: Array<Sample> = new Array<Sample>();
      // data.forEach(data => {
      //   samples.push(
      //     new Sample
      //     {
      //     sampleID: data.sample.sampleID,
      //     audioUnit: data.audioUnit
      //     // title: data.audioUnit.title,
      //     // genre: data.sample.audioUnit.genre,
      //     // tempo: data.sample.audioUnit.tempo,
      //     // moods: data.sample.audioUnit.moods,
      //     // tags: data.sample.audioUnit.tags,
      //     // audioFileName: data.sample.audioUnit.audioFileName,
      //     // imageFileName: data.sample.audioUnit.imageFileName,
      //     // lep: data.sample.audioUnit.lep,
      //     // artistName: data.sample.audioUnit.artistAlias.artistName
      //   })
      // });
      console.log(basicLicenses);
      // basicLicenses.forEach((license) => {
      //   license.
      // });
      this.basicLicenseSubject$.next(basicLicenses);
      console.log('Basic Licenses');
      // console.log(data);
    });
  }

  // public retrieveSamples(): void {
  //   const params = this.sampleLicensingMarketService.getRequestParams(this.sortBy, this.page, this.pageSize);
  //   this.sampleLicensingMarketService.getAudioFiles(params).pipe(
  //     share(),
  //   ).subscribe((response) => {
  //     console.log("Response");
  //     console.log(response);
  //     const { samples, totalItems } = response;
  //     this.count = totalItems;
  //     this.sampleLicensingMarketService.samples$.next(samples);
  //     // (samples as Array<Sample>).forEach(sample => {
  //       //   this.sampleCheckboxMap.set(sample)
  //       // });
  //       // this.cdr.detectChanges();
  //       // setTimeout()
  //       // this.cdr.detectChanges();
  //       let that = this;
  //       // setTimeout(() => {
  //       // for(let i = 0; i < (samples as Array<Sample>).length; i++) {
  //       //   this.audioPanelCheckboxService.sampleCheckboxMap.set(samples[i], that.checkboxList.toArray[i]);
  //       //   console.log(that.checkboxList.toArray()[i]);
  //       //   console.log(that.checkboxList[i]);
  //       // }
  //     // }, 1000);

  //   }, (error) => {
  //     if (error instanceof HttpErrorResponse) {
  //       if (error.status === 401) {
  //         this.ls.clear();
  //         this.jwt.signin();
  //       }
  //     }
  //     console.log(error);
  //   });
  // }

  handleMixedIn(change: MatCheckboxChange, sample: Sample) {
    if (change.checked) {
      if (!((this.data.mixedIns as Array<Sample>).filter(element => element.sampleID === sample.sampleID).length > 0)) {
        this.data.mixedIns.push(sample);
      }
    } else {
      if ((this.data.mixedIns as Array<Sample>).filter(element => element.sampleID === sample.sampleID).length > 0) {
        // (this.data.mixedIns as Array<Sample>).map()
        this.data.mixedIns = (this.data.mixedIns as Array<Sample>).filter(element => element.sampleID !== sample.sampleID);
        // const index = (this.data.mixedIns as Array<Sample>).indexOf(sample, 1);
        // if (index > -1) {
        //   this.data.mixedIns.splice(index, 1);
        // }
      }
    }
  }

  // public initCheckboxes() {
  //   this.audioPanelCheckboxService.sampleCheckboxMap.forEach((value, key) => {
  //     if((this.data.mixedIns as Array<Sample>).includes(key)) {
  //       // value.checked = true;
  //       this.audioPanelCheckboxService.checked$.next(value);
  //       // this.cdr.detectChanges();
  //     }
  //   });
  // }



  checkBox(sample: Sample) {
    if((this.data.mixedIns as Array<Sample>).filter(element => element.sampleID === sample.sampleID).length > 0) {
      return true;
    } else {
      return false;
    }
    // if(this.data.mixedIns.includes(sample)) {
    //   return true;
    // } else {
    //   return false;
    // }

    
  }



  // handleCheckedSamples(sample: Sample) {
  //   if((this.data.mixedIns as Array<Sample>).filter((element) => sample === element).length > 0) {
  //     return true;
  //   } else {
  //     return false;
  //   };
  // }


}
