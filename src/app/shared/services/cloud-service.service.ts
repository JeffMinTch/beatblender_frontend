import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, share } from 'rxjs/operators';
import { SampleSearchQuery } from '../models/sample-search-query.model';

@Injectable({
  providedIn: 'root'
})
export class CloudService {

  constructor(private httpClient: HttpClient) { }

  SAMPLEPOOL_API = "http://localhost:8080/api/samplepool";
  audioFilesUrl = this.SAMPLEPOOL_API + '/public/audioFiles';
  searchMusicUrl = this.SAMPLEPOOL_API + '/public/searchMusic';
  searchMusicByInputUrl = this.SAMPLEPOOL_API + '/public/searchMusicByInput';
  searchSingleAudioUrl = this.SAMPLEPOOL_API + '/public/searchSingleAudio';
  searchMultipleAudioUrl = this.SAMPLEPOOL_API + '/public/searchMultipleAudio';
  downloadBasicLicenseUrl = this.SAMPLEPOOL_API + '/public/downloadBasicLicense';
  downloadFullLicenseUrl = this.SAMPLEPOOL_API + '/public/downloadFullLicense';

  basicUserDataUrl = this.SAMPLEPOOL_API + '/public/basicUserDataUrl';

  files: any = [
    {
      url:
        "assets/images/rythm.mp3",
      name: "Perfect",
      artist: "Ed Sheeran"
    },
    {
      url:
        "assets/images/techno.mp3",
      name: "Perfect",
      artist: " Ed Sheeran"
    }

  ];





  getFiles() {
    return of(this.files);
  }


  audioFiles: any = [
    {
      id: "0",
      url: "assets/images/s1.mp3",
      img: "assets/images/typ.jpg",
      title: "Rythm of the Night",
      artist: "Corona"
    },
    {
      id: "1",
      url: "assets/images/s15.mp3",
      img: "assets/images/typ1.jpg",
      title: "Meldepflicht",
      artist: "SA4 feat. BRUDI030"
    },
    {
      id: "2",
      url: "assets/images/s2.mp4",
      img: "assets/images/typ2.jpg",
      title: "Space Cowboy",
      artist: "Prime Thanatos"
    },
    {
      id: "3",
      url: "assets/images/s14.mp3",
      img: "assets/images/frau.jpg",
      title: "Innerbloom",
      artist: "RÜFÜS DU SOL"
    },
    {
      id: "4",
      url: "assets/images/s4.mp3",
      img: "assets/images/typ6.jpg",
      title: "My friends never die",
      artist: "ODESZA"
    },
    {
      id: "5",
      url: "assets/images/s5.mp3",
      img: "assets/images/typ7.jpg",
      title: "Porcelain",
      artist: "Moby"
    },
    {
      id: "6",
      url: "assets/images/s6.mp3",
      img: "assets/images/typ8.jpg",
      title: "Sky and Sand",
      artist: "Fritz Kalkbrenner, Paul Kalkbrenner"
    },
    {
      id: "7",
      url: "assets/images/s7.mp3",
      img: "assets/images/typ5.jpg",
      title: "Gossenboss mit Zett",
      artist: "Linseneintopf"
    },
    {
      id: "8",
      url: "assets/images/s8.mp3",
      img: "assets/images/typ10.jpg",
      title: "Kavinsky",
      artist: "Nightcall"
    },
    {
      id: "9",
      url: "assets/images/s9.mp3",
      img: "assets/images/typ11.jpg",
      title: "Cromatics",
      artist: "Cherry"
    },
    {
      id: "10",
      url: "assets/images/s10.mp3",
      img: "assets/images/typ12.jpg",
      title: "Crocket's Theme",
      artist: "Miami Vice"
    },
    {
      id: "11",
      url: "assets/images/s11.mp3",
      img: "assets/images/typ13.jpg",
      title: "L$D",
      artist: "ASAP Rocky"
    },
    {
      id: "12",
      url: "assets/images/s12.mp3",
      img: "assets/images/typ9.jpg",
      title: "Kavinsky",
      artist: "Nightcall"
    },
    {
      id: "13",
      url: "assets/images/s13.mp3",
      img: "assets/images/a1.png",
      title: "Kavinsky",
      artist: "Nightcall"
    }
  ];

  getAudioFiles(): Observable<any> {
    // return of(this.audioFiles);

    return this.httpClient.get(this.audioFilesUrl).pipe(share());

  }

  getAudio(userName: string, fileName: string): Promise<any> {
    return this.httpClient.get(this.SAMPLEPOOL_API + '/' + userName + '/' + fileName).toPromise();
  }


  searchMusic(
    genres: string[],
    regions: string[],
    trackTypes: string[],
    songKeys: string[],
    bpmMinMax: string[],
    yearMinMax: string[]
  ): Observable<any> {

    const formData: FormData = new FormData();

    for (let i = 0; i < genres.length; i++) {
      formData.append('genres', genres[i]);
    }

    for (let i = 0; i < regions.length; i++) {
      formData.append('regions', regions[i]);
    }

    for (let i = 0; i < trackTypes.length; i++) {
      formData.append('trackTypes', trackTypes[i]);
    }

    for (let i = 0; i < songKeys.length; i++) {
      formData.append('songKeys', songKeys[i]);
    }

    for (let i = 0; i < bpmMinMax.length; i++) {
      formData.append('bpmMinMax', bpmMinMax[i]);
    }

    for (let i = 0; i < yearMinMax.length; i++) {
      formData.append('yearMinMax', yearMinMax[i]);
    }

    return this.httpClient.post(this.searchMusicUrl, formData);
  }


  searchAudioByFormInput(searchString: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('searchString', searchString);
    return this.httpClient.post(this.searchMusicByInputUrl, formData);
    
    // .pipe(
    //   share(),
    //   map((data: any) => data.sampleSearchQueries)
    // );
  }

  searchSingleAudio(sampleId: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('sampleId', JSON.stringify(sampleId));
    return this.httpClient.post(this.searchSingleAudioUrl, formData);
  }

  searchMultipleAudio(sampleIds: Array<number>): Observable<any> {
    const formData: FormData = new FormData();
    for (let i = 0; i < sampleIds.length; i++) {
      formData.append("sampleIds", JSON.stringify(sampleIds[i]));
    }
    return this.httpClient.post(this.searchMultipleAudioUrl, formData);
  }

  downloadBasicLicense(userName: string, sampleID: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("userName", userName);
    // formData.append("fileName", fileName);
    formData.append("sampleID", JSON.stringify(sampleID));
    return this.httpClient.post(this.downloadBasicLicenseUrl, formData);
  }

  downloadFullLicense(sampleID: number): Observable<any> {
    const formData: FormData = new FormData();
    // formData.append("userName", userName);
    formData.append("sampleID", JSON.stringify(sampleID));
    return this.httpClient.post(this.downloadFullLicenseUrl, formData);
  }

  getBasicUserData(userID: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("userID", userID);
    return this.httpClient.post(this.basicUserDataUrl, formData);
  }


}

