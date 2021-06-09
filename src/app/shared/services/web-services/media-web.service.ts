import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MediaWebService {

  constructor(
    private httpClient: HttpClient
  ) { }

  downloadFile(API: string): Observable<Blob> {
    return this.httpClient.get(API, {responseType: 'blob'}).pipe(map(
      (res : any) => {
        console.log(res);
        return res;
    })
    );
        
}


}
