import { Page } from './../../models/page.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchFilterFormMap } from 'app/shared/models/search-filter-form-map.model';
import { environment } from 'environments/environment'
import { Observable, Subject } from 'rxjs';
import { share } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AudioWebService {

  public searchFilterSubject$ : Subject<any> = new Subject<any>();

  constructor(
    private httpClient: HttpClient
  ) { }

  

  private ROOT = environment.apiURL.baseUrl;
  private PUBLIC_AUDIO = this.ROOT + environment.apiURL.audioPath.public.root;
  private samplesHomeApi: string = this.PUBLIC_AUDIO + environment.apiURL.audioPath.public.samplesHome;
  private findByStringApi: string = this.PUBLIC_AUDIO + environment.apiURL.audioPath.public.findByString;
  private applySearchFilterApi: string = this.PUBLIC_AUDIO + environment.apiURL.audioPath.public.filterSamples;
  
  public getAudioFiles(params: any): Observable<any> {
    return this.httpClient.get(this.samplesHomeApi, { params }).pipe(share());
  }

  public findBySearchString(params: any): Observable<any> {
    return this.httpClient.get(this.findByStringApi, { params });
  }

  public applySearchFilter(searchString: string, searchFilterFormMap: SearchFilterFormMap, page: Page): void {
    const formData: FormData = new FormData();
    formData.append('searchString', searchString);
    formData.append('sortBy', page.sortBy);
    formData.append('pageNo', JSON.stringify(page.pageNo));
    formData.append('pageSize', JSON.stringify(page.pageSize));

    searchFilterFormMap.selectionFormMap.forEach((selection, control) => {
      (control.value as Array<any>).forEach((value) => {
        if(value !== 0) {
          formData.append(selection.label, value);
        }
      });
    });
    searchFilterFormMap.minMaxSliderFormMap.forEach((minMaxSlider, formGroup) => {
      formData.append(`min${minMaxSlider.label}`, JSON.stringify(formGroup.controls['minControl'].value));
      formData.append(`max${minMaxSlider.label}`, JSON.stringify(formGroup.controls['maxControl'].value));
    });   
    this.httpClient.post(this.applySearchFilterApi, formData).subscribe((data) => {
      this.searchFilterSubject$.next(data);
    },
    (error: HttpErrorResponse) => {
      if(error.status === 404) {
        alert("Nothing Found");
        const response = {
          samples: [],
          totalItems: 0
        }
        this.searchFilterSubject$.next(response);
        // this.count = 0;
      }
    }
    );
  }

  // searchAudioByFormInput(searchString: string): Observable<any> {
  //   const formData: FormData = new FormData();
  //   formData.append('searchString', searchString);
  //   return this.httpClient.post(this.findMultipleSuggestionsApi, formData);
  // }

  // searchSingleAudio(sampleId: number): Observable<any> {
  //   const formData: FormData = new FormData();
  //   formData.append('sampleId', JSON.stringify(sampleId));
  //   return this.httpClient.post(this.findOneApi, formData);
  // }

  // searchMultipleAudio(sampleIds: Array<number>): Observable<any> {
  //   const formData: FormData = new FormData();
  //   for (let i = 0; i < sampleIds.length; i++) {
  //     formData.append("sampleIds", JSON.stringify(sampleIds[i]));
  //   }
  //   return this.httpClient.post(this.findMultipleApi, formData);
  // }


}
