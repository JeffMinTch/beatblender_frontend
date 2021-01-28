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

  getAudioFiles(): Observable<any> {
    // return of(this.audioFiles);
    return this.httpClient.get(this.samplesHomeApi).pipe(share());
  }
}
