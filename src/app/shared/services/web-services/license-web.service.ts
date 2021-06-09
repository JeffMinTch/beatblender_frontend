import { map } from 'rxjs/operators';
import { TrackResponse } from './../../models/track-response.model';
import { Injectable } from '@angular/core';
import { Sample } from 'app/shared/models/sample.model';
import { environment } from 'environments/environment';
import { Subject, Observable, config } from 'rxjs';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class LicenseWebService {

  private ROOT = environment.apiURL.baseUrl;
  private PROTECTED_LICENSE = this.ROOT + environment.apiURL.licensePath.protected.root;
  private GET_BASIC_LICENSE_API: string = this.PROTECTED_LICENSE + environment.apiURL.licensePath.protected.basicLicense.root + environment.apiURL.licensePath.protected.basicLicense.getBasicLicense;
  private GET_ALL_API: string = this.PROTECTED_LICENSE + environment.apiURL.licensePath.protected.basicLicense.root + environment.apiURL.licensePath.protected.basicLicense.getAll;
  private GET_ALL_TRACKS: string = this.PROTECTED_LICENSE + environment.apiURL.licensePath.protected.basicLicense.root + environment.apiURL.licensePath.protected.basicLicense.getAllTracks;
  
  public searchFilterSubject$ : Subject<any> = new Subject<any>();


  constructor(
    // private jwt: JwtAuthService,
    private httpClient: HttpClient
  ) { }


  getBasicLicense(sample: Sample): Observable<any> {
    // const downloaderID: string = this.jwt.getUserInfo().sub;
    const formData: FormData = new FormData();
    // formData.append('downloaderID', downloaderID);
    formData.append('sampleID', sample.sampleID);
    
    return this.httpClient.post(this.GET_BASIC_LICENSE_API, formData);
  }

  getAllBasicLicense(): Observable<any> {
    return this.httpClient.get(this.GET_ALL_API);
  }

  getAllTracks(): Observable<Array<TrackResponse>> {
    return this.httpClient.get(this.GET_ALL_TRACKS).pipe(map((value: Array<TrackResponse>) => {
      return value;
    }));
  }

  

handleError() {
  throw new Error("Cannot throw");
}



}
