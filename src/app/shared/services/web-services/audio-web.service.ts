import { Page } from './../../models/page.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchFilterFormMap } from 'app/shared/models/search-filter-form-map.model';
import { environment } from 'environments/environment'
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AudioWebService {
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

  public applySearchFilter(searchString: string, searchFilterFormMap: SearchFilterFormMap, page: Page): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('searchString', searchString);
    formData.append('page', JSON.stringify(page));
    searchFilterFormMap.selectionFormMap.forEach((selection, control) => {
      (control.value as Array<string>).forEach((value) => {
        formData.append(selection.label, value);
      });
    });
    searchFilterFormMap.minMaxSliderFormMap.forEach((minMaxSlider, formGroup) => {
      formData.append(`min${minMaxSlider.label}`, JSON.stringify(formGroup.controls['minControl'].value));
      formData.append(`max${minMaxSlider.label}`, JSON.stringify(formGroup.controls['maxControl'].value));
    });   
    return this.httpClient.post(this.applySearchFilterApi, formData);
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
