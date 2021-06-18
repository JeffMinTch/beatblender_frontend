import { MediaWebService } from './../../../../shared/services/web-services/media-web.service';
import { FullLicenseResponse } from './../../../../shared/models/full-license-response.model';
import { TrackResponse } from './../../../../shared/models/track-response.model';
import { LicenseWebService } from './../../../../shared/services/web-services/license-web.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BasicLicense } from '../../../../shared/models/basic-license.model';
import { Track } from 'app/shared/models/track.model';
import { environment } from 'environments/environment';
import {saveAs as importedSaveAs} from "file-saver";
import { AudioService } from 'app/shared/services/audio.service';
import { MatDialog } from '@angular/material/dialog';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { SimpleDialogComponent } from 'app/shared/components/dialogs/simple-dialog/simple-dialog.component';
import { Theme } from 'app/shared/enums/theme.enum';






@Component({
  selector: 'app-extended-licenses',
  templateUrl: './extended-licenses.component.html',
  styleUrls: ['./extended-licenses.component.scss']
})
export class ExtendedLicensesComponent implements OnInit {

  // dataSource: MatTableDataSource<PeriodicElement>;
  // displayedColumns: string[];
  dataSource = new MatTableDataSource<any>([]);
  fullLicenseDataSource = new MatTableDataSource<any>([]);

  displayedColumns = ['image', 'id', 'title', 'copyrightOwner', 'extensionPrice', 'downloadSampleLink', 'downloadContractLink'];
  displayedFullLicenseColumns = ['image','id','title', 'extensionPrice', 'status'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // public fullLicenseResponse: Array<FullLicenseResponse> = new Array<FullLicenseResponse>();

  constructor(
    private licenseWebService: LicenseWebService,
    private mediaWebServce: MediaWebService,
    private audioService: AudioService,
    public dialog: MatDialog,
    private loader: AppLoaderService,
  ) {
    
  }

  ngOnInit() {



    this.licenseWebService.getAllUnextendedTracks().subscribe((trackResponse: Array<TrackResponse>) => {
      console.log(trackResponse);
      this.dataSource = new MatTableDataSource<any>(trackResponse);
      
    }, (error: Error) => {
      throw error;
    });

    this.licenseWebService.getFullLicenses().subscribe((fullLicenses) => {
      // alert("Full Licenses received");
      console.log(fullLicenses);

      this.audioService.createWavesurferObj(Theme.BODY);
          this.audioService.loadPlayAudio(fullLicenses[0].fullLicense.track.audioUnit.audioUnitID);

      this.fullLicenseDataSource = new MatTableDataSource<FullLicenseResponse>(fullLicenses);
      console.log(fullLicenses);
      // this.fullLicenseResponse
    });
    // this.displayedColumns = ['position', 'name', 'weight', 'symbol', 'c'];
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.dataSource.d
  }

  getData(dataSource) {
    const array: Array<any> = new Array<any>();
    array.push(dataSource);
    return array;
  }

  getMixedInTableData(mixedIns): MatTableDataSource<BasicLicense> {
    const dataSource = new MatTableDataSource<BasicLicense>(mixedIns);
    return dataSource;
  }

  getAggregatedSamplePrice(basicLicenses: Array<BasicLicense>) {
    // console.log(basicLicenses);
    let sum = 0;
    basicLicenses.forEach((basicLicense) => {
      sum += basicLicense.lep;
    });
    return sum;
  }


  withdrawExtensionOption(track: Track) {
      this.loader.open();
     this.licenseWebService.withdrawLicenseOption(track).subscribe((data) => {
      this.loader.close();
      const dialogRef = this.dialog.open(SimpleDialogComponent, {
        width: '550px',
        // data: {name: this.name, animal: this.animal}
        data: {
          title: 'Congratulations!',
          firstParagraph: `Now you own a Full License for ${track.audioUnit.title}.`,
          submitButton: 'Yes, Sir!',
          // route: ''
          // cancelButton: 'Stay here.'
        },
        // data: this.formsMap.get(item).controls['mixedIns'].value,
        hasBackdrop: false
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        // this.router.navigate(['profile', 'my-licenses', 'basic-licenses']);
        window.location.reload();
        // this.animal = result;
      });
      console.log(data);
     });       
  }

  downloadFullLicenseFile(element: FullLicenseResponse) {
    console.log(element);
    const API = `${environment.apiURL.baseUrl + environment.apiURL.mediaPath.protected.root + environment.apiURL.mediaPath.protected.getFullLicenseFile}/${element.fullLicense.fullLicenseID}`;
    // window.location.href = API;

    this.mediaWebServce.downloadFile(API).subscribe(blob => {
      // console.log(blob);
      //     const url= window.URL.createObjectURL(blob);
      // window.location.href= API;
      // window.saveAs(blob, element.sample.audioUnit.audioFileName)
      importedSaveAs(blob, 'full_license_' + element.fullLicense.track.audioUnit.title + '.pdf');
  });
  }

  downloadAudioFile(basicLicense: any) {
    console.log(basicLicense);
    const API: string = `${environment.apiURL.baseUrl + environment.apiURL.mediaPath.public.root + environment.apiURL.mediaPath.public.audio}/${basicLicense.sample.audioUnit.audioUnitID}`;
    // window.location.href = API;

    this.mediaWebServce.downloadFile(API).subscribe(blob => {
      // console.log(blob);
  //     const url= window.URL.createObjectURL(blob);
  // window.location.href= API;
  // window.saveAs(blob, element.sample.audioUnit.audioFileName)
      importedSaveAs(blob, basicLicense.sample.audioUnit.audioFileName);
  }
)
  }

  

  downloadBasicLicenseFile(basicLicense: BasicLicense) {
    const API = `${environment.apiURL.baseUrl + environment.apiURL.mediaPath.protected.root + environment.apiURL.mediaPath.protected.getBasicLicenseFile}/${basicLicense.sample.sampleID}/${basicLicense.downloader.uuid}`;
    window.location.href = API;
  }

  
  


  



}
