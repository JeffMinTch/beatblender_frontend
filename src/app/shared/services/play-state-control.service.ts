import { Injectable, OnDestroy } from '@angular/core';
import { Sample } from '../models/sample.model';
import { CurrentFile } from '../models/current-file.model';
import { ComponentCommunicationService } from './component-communication.service';
import { BehaviorSubject, Subject } from 'rxjs';


const PLAY_STATE_KEY= 'PlayState';
const ID_CURRENT_PLAY_ELEMENT = "idCurrentPlayElement";
const ID_OLD_PLAY_ELEMENT="idOldPlayElement";
const HISTORY_AUDIO_CONTAINER_FILES_KEY = "historyPlaylist";
const CURRENT_FILE = 'currentFile';
@Injectable({
  providedIn: 'root'
})
export class PlayStateControlService implements OnDestroy {

  private currentFile: CurrentFile;
  private playState=false;
  private idCurrentPlayElement: number=null;

  constructor(private componentCommunicationService: ComponentCommunicationService) { }
  
  
  public playStateServiceDestroyed$: Subject<void> = new Subject<void>();
  private historyAudioFiles: Array<Sample> = [];
  
  // public savePlayState(playState: boolean) {
  //   this.playState = playState;
  //   this.playStateSubject.next(this.playState);
  // }
  
  public getPlayState():boolean {
    return this.playState;
  }
  
  private playStateSubject = new BehaviorSubject<boolean>(false);
  playState$ = this.playStateSubject.asObservable();
  emitPlayState(playState: boolean) {
    this.playStateSubject.next(playState);
  }
  
  private currentSampleIDSubject = new BehaviorSubject<number>(0);
  currentSampleID$ = this.currentSampleIDSubject.asObservable();
  emitCurrentSampleID(currentSampleID: number) {
    this.currentSampleIDSubject.next(currentSampleID);
  }
  
  ngOnDestroy(): void {
    this.playStateServiceDestroyed$.next();
  }
  // public savePlayState(playState: boolean) {
  //   window.sessionStorage.removeItem(PLAY_STATE_KEY);
  //   window.sessionStorage.setItem(PLAY_STATE_KEY, JSON.stringify(playState));
  // }


  // public getPlayState():boolean {
  //   let playStateAsString = sessionStorage.getItem(PLAY_STATE_KEY);
  //   return JSON.parse(playStateAsString);
  // }

  // public saveIDCurrentPlayElement(id: number) {
  //   this.idCurrentPlayElement = id;
  //   this.emitCurrentSampleID(this.idCurrentPlayElement);
  // }


  public getIDCurrentPlayElement(): number {
    return this.idCurrentPlayElement;
    // let idCurrentPlayElement = sessionStorage.getItem(ID_CURRENT_PLAY_ELEMENT);
    
    // if(idCurrentPlayElement != null) {
    //   // console.log('Bong: ' + idCurrentPlayElement);
    //   return idCurrentPlayElement;
    // } else {
      
    //   return "[ERROR]: in playStateControlService";
    // }
  }

  

  public saveIDOldPlayElement(id:string) {
    window.sessionStorage.removeItem(ID_OLD_PLAY_ELEMENT);
    window.sessionStorage.setItem(ID_OLD_PLAY_ELEMENT, id);
  }

  public getIDOldPlayElement(): string {
    let idOldPlayElement = sessionStorage.getItem(ID_OLD_PLAY_ELEMENT);
    
    if(idOldPlayElement != null) {
      // console.log('Bong: ' + idCurrentPlayElement);
      return idOldPlayElement;
    } else {
      
      return "[ERROR]: in playStateControlService";
    } 
  }

  //save the currentFile State globally
  public saveCurrentFile(currentFile:CurrentFile):CurrentFile {
    this.currentFile = currentFile;
    this.componentCommunicationService.emitCurrentFile(this.currentFile);
    // window.sessionStorage.removeItem(CURRENT_FILE);
    // window.sessionStorage.setItem(CURRENT_FILE, JSON.stringify(currentFile));
    return currentFile;
  }

  //retrieve CurrentFileState globally
  public getCurrentFile(): any {
    // let currentFile = sessionStorage.getItem(CURRENT_FILE);
    
    if(this.currentFile != null) {
      return this.currentFile;
      // return JSON.parse(this.currentFile);
    } else {
      let currentFile = {};
      return currentFile;
    } 
  }

  // setCurrentStreamState(currentStreamState: StreamState) {
    
  //   this.currentFile = this.getCurrentFile();
  //   this.currentFile.currentStreamState = currentStreamState;
  //   console.log(this.currentFile);
  //   this.saveCurrentFile(this.currentFile);
  //   // console.dir('Set CurrentStreamState');
  //   // console.dir(this.getCurrentFile());

  // }

  // getCurrentStreamState():StreamState{
  //   return this.getCurrentFile().currentStreamState;
  // }

  //update only the currentTime property of Current File
  // updateCurrentTime(currentTime: number) {
    
  //   this.currentFile = this.getCurrentFile();
  //   this.currentFile.currentStreamState.currentTime = currentTime;
  //   this.saveCurrentFile(this.currentFile);
  
  // }


  //update only the duration property of Current File
  // updateDuration(duration:number) {
    
  //   this.currentFile = this.getCurrentFile();
  //   this.currentFile.currentStreamState.duration = duration;
  //   this.saveCurrentFile(this.currentFile);
    
  // }


  // updateReadableCurrentTime(readableCurrentTime:string) {

  //   this.currentFile = this.getCurrentFile();
  //   this.currentFile.currentStreamState.readableCurrentTime = readableCurrentTime;
  //   this.saveCurrentFile(this.currentFile);

  // }

  // updateReadableDuration(readableDuration:string) {

  //   this.currentFile = this.getCurrentFile();
  //   this.currentFile.currentStreamState.readableDuration=readableDuration;
  //   this.saveCurrentFile(this.currentFile);

  // }

  updateCurrentFile(file: Sample, index:number) {
    this.currentFile = this.getCurrentFile();
    this.currentFile.file = file;
    this.currentFile.index=index;
    this.saveCurrentFile(this.currentFile);
  }


  // updateAllCurrentFile(file:AudioFile, index:number, currentStreamState:StreamState) {
    
  //   this.currentFile = this.getCurrentFile();
  //   this.currentFile.file = file;
  //   this.currentFile.index=index;
  //   this.currentFile.currentStreamState=currentStreamState;
  //   console.log(this.currentFile);
  //   this.saveCurrentFile(this.currentFile);

  // }



  public saveHistoryPlaylist(audioFile: Sample) {
    this.historyAudioFiles = this.getHistoryPlaylist();
    if(this.historyAudioFiles.length >= 5) {
      this.historyAudioFiles.shift();  
    }
    this.historyAudioFiles.push(audioFile);

    window.sessionStorage.removeItem(HISTORY_AUDIO_CONTAINER_FILES_KEY);
    window.sessionStorage.setItem(HISTORY_AUDIO_CONTAINER_FILES_KEY, JSON.stringify(this.historyAudioFiles));
  }

  public getHistoryPlaylist(): Sample[] {
    
    this.historyAudioFiles = [];
    if(sessionStorage.getItem(HISTORY_AUDIO_CONTAINER_FILES_KEY)) {
      JSON.parse(sessionStorage.getItem(HISTORY_AUDIO_CONTAINER_FILES_KEY)).forEach(audioFile => {
        this.historyAudioFiles.push(audioFile);
      });
    }
    return this.historyAudioFiles;
  }


  public removeSessionStorage() {
    window.sessionStorage.removeItem(ID_CURRENT_PLAY_ELEMENT);
    window.sessionStorage.removeItem(CURRENT_FILE);
    
  }




  

}