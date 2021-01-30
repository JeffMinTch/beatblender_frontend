import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    private findMultipleSuggestionsApi: string = this.PUBLIC_AUDIO + environment.apiURL.audioPath.public.searchMusicByInput;
    private findOneApi: string = this.PUBLIC_AUDIO + environment.apiURL.audioPath.public.searchSingleAudio;
    private findMultipleApi: string = this.PUBLIC_AUDIO + environment.apiURL.audioPath.public.searchMultipleAudio;

    getAudioFiles(params): Observable<any> {
    return this.httpClient.get(this.samplesHomeApi, { params }).pipe(share());
  }

  searchAudioByFormInput(searchString: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('searchString', searchString);
    return this.httpClient.post(this.findMultipleSuggestionsApi, formData);
  }

  searchSingleAudio(sampleId: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('sampleId', JSON.stringify(sampleId));
    return this.httpClient.post(this.findOneApi, formData);
  }

  searchMultipleAudio(sampleIds: Array<number>): Observable<any> {
    const formData: FormData = new FormData();
    for (let i = 0; i < sampleIds.length; i++) {
      formData.append("sampleIds", JSON.stringify(sampleIds[i]));
    }
    return this.httpClient.post(this.findMultipleApi, formData);
  }


}
