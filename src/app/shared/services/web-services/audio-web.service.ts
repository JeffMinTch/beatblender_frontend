import { AudioUnitType } from './../../enums/audio-unit-type.enums';
import { TrackPage } from './../../models/track-page.model';
import { PaginationRequestParams } from '../../models/pagination-request-params.model';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchFilterFormMap } from 'app/shared/models/search-filter-form-map.model';
import { environment } from 'environments/environment'
import { Observable, Subject } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { SamplePage } from 'app/shared/models/sample-page.model';




@Injectable({
  providedIn: 'root'
})
export class AudioWebService {



  public searchFilterSubject$: Subject<any> = new Subject<any>();

  constructor(
    private httpClient: HttpClient
  ) { }



  private ROOT = environment.apiURL.baseUrl;
  private PUBLIC_AUDIO = this.ROOT + environment.apiURL.audioPath.public.root;
  private samplesHomeApi: string = this.PUBLIC_AUDIO + environment.apiURL.audioPath.public.samplesHome;
  private TRACKS_HOME: string = this.PUBLIC_AUDIO + environment.apiURL.audioPath.public.tracksHome;
  private findByStringApi: string = this.PUBLIC_AUDIO + environment.apiURL.audioPath.public.findByString;
  private applySampleSearchFilterApi: string = this.PUBLIC_AUDIO + environment.apiURL.audioPath.public.filterSamples;
  private FILTER_TRACKS: string = this.PUBLIC_AUDIO + environment.apiURL.audioPath.public.filterTracks;

  public getSamplePage(params: any): Observable<SamplePage> {
    return this.httpClient.get(this.samplesHomeApi, { params }).pipe(map((res: SamplePage) => { return res }), share());
  }

  public getTracksHome(params: any): Observable<TrackPage> {
    return this.httpClient.get(this.TRACKS_HOME, { params }).pipe(map((res: TrackPage) => { return res }), share());
  }



  public findBySearchString(audioUnitType: AudioUnitType, params: HttpParams): Observable<SamplePage | TrackPage> {
    let api: string;
    switch(audioUnitType) {
      case AudioUnitType.Sample:
        api = this.findByStringApi;
        break;
      case AudioUnitType.Track:
        api = this.FILTER_TRACKS;
        break;
      default:
        throw new Error('Wrong AudioUnitType');
      }
      return this.httpClient.get(api, { params: params }).pipe( map((page: SamplePage | TrackPage) => page));
  }

  public applySearchFilter(searchString: string, searchFilterFormMap: SearchFilterFormMap, audioUnitType: AudioUnitType, paginationRequestParams: PaginationRequestParams): void {
    const formData: FormData = new FormData();
    formData.append('searchString', searchString);
    formData.append('sortBy', paginationRequestParams.sortBy);
    formData.append('pageNo', JSON.stringify(paginationRequestParams.pageNo));
    formData.append('pageSize', JSON.stringify(paginationRequestParams.pageSize));
    console.log(paginationRequestParams.pageNo);
    console.log(paginationRequestParams.sortBy);
    console.log(paginationRequestParams.pageSize);

    searchFilterFormMap.selectionFormMap.forEach((selection, control) => {
      (control.value as Array<any>).forEach((value) => {
        if (value !== 0) {
          formData.append(selection.label, value);
        }
      });
    });
    searchFilterFormMap.minMaxSliderFormMap.forEach((minMaxSlider, formGroup) => {
      formData.append(`min${minMaxSlider.label}`, JSON.stringify(formGroup.controls['minControl'].value));
      formData.append(`max${minMaxSlider.label}`, JSON.stringify(formGroup.controls['maxControl'].value));
    });
    // if(audioUnitType === AudioUnitType.Sample) {
    //   api = this.applySampleSearchFilterApi;
    // } else if()
    let api: string;
    switch (audioUnitType) {
      case AudioUnitType.Sample:
        api = this.applySampleSearchFilterApi;
        break;
      case AudioUnitType.Track:
        api = this.TRACKS_HOME;
        break;
      default:
        throw new Error('Wrong Audio Unit Type');
    }

    this.httpClient.post(api, formData).subscribe((data) => {
      this.searchFilterSubject$.next(data);
    },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
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


  filterTracks(params: HttpParams): Observable<TrackPage> {
    return this.httpClient.get(this.FILTER_TRACKS, { params: params}).pipe(map((trackPage: TrackPage) => trackPage));
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
