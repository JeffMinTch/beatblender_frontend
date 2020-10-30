import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { Sample } from '../models/sample.model';
import { CloudService } from './cloud-service.service';
import { ComponentCommunicationService } from './component-communication.service';
import { PlayStateControlService } from './play-state-control.service';

@Injectable({
  providedIn: 'root'
}
)
export class StateManagerService {


  isAuthenticated=false;
  isAudioFiles:boolean;
  // files: Array<AudioFile> = [];
  audioFiles: Array<Sample> = [];
  isBrowserRefreshed: boolean=null;

  constructor(
    // public oktaAuth: OktaAuthService,
    private playStateControlService: PlayStateControlService,
    private cloudService: CloudService,
    private componentCommunicationService: ComponentCommunicationService
    ) { }

  // authenticate() {
  //   this.oktaAuth.isAuthenticated().then((isAuth) => {
  //     this.isAuthenticated = isAuth;
  //   });
  // }

  getIsAudioFiles() {
    return this.isAudioFiles;
  }

  

  getAudioFiles() {
    return this.audioFiles;
  }

  getAuthenticationState():boolean {
    return this.isAuthenticated;
  }

  setIsAudioFiles(isAudioFiles:boolean) {
    this.isAudioFiles = isAudioFiles;
    this.componentCommunicationService.emitIsFiles(this.isAudioFiles);
  }

  // setFiles(audioFiles: Array<AudioFile>) {
  //   this.audioFiles = audioFiles;
  // }
  
  setAudioFiles(audioFiles: Array<Sample>){
    this.audioFiles=audioFiles;
    this.componentCommunicationService.emitFiles(this.audioFiles);
  }

  // initCurrentFile() {
  //   if (Object.keys(this.playStateControlService.getCurrentFile()).length === 0) {
  //     this.playStateControlService.updateCurrentFile(this.audioFiles[0], 0);
  //   }
  // }


//   load() {
//     console.log("Initializing App");
//     this.playStateControlService.removeSessionStorage();
//     return new Promise(async (resolve, reject) => {
        
//         await this.cloudService.getAudioFiles().subscribe((serverFiles) => {
//           this.isAudioFiles = true;
//           // this.componentCommunicationService.emitIsFiles(this.isFiles);
//           for (let i = 0; i < serverFiles.audioFileResponse.length; i++) {
//             const fileTemplate: AudioFile = {
//               id: i.toString(),
//               url: serverFiles.audioFileResponse[i].audioFile,
//               img: serverFiles.audioFileResponse[i].imageDownLoadUri,
//               title: serverFiles.audioFileResponse[i].sampleTitle,
//               artist: serverFiles.audioFileResponse[i].artistName,
//               userName: serverFiles.audioFileResponse[i].id,
//               samplePrice: serverFiles.audioFileResponse[i].samplePrice,
//               sampleID: serverFiles.audioFileResponse[i].sampleID,
//               sampleDetails: {
//                 genre: serverFiles.audioFileResponse[i].genre,
//                 trackType: serverFiles.audioFileResponse[i].trackType,
//                 songKey: serverFiles.audioFileResponse[i].songKey,
//                 region: serverFiles.audioFileResponse[i].region,
//                 audioDescription: serverFiles.audioFileResponse[i].audioDescription,
//               }
//             }
    
//             this.audioFiles.push(fileTemplate);
//             // this.audioFiles.push(fileTemplate);
//           }
          
//           return true;
//         }, (reason) => {
//           return false;
//         });
//         // this.initCurrentFile();
//         resolve(true);
//     })
// }
}
