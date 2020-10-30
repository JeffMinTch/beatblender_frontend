import { ElementRef, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Sample } from '../models/sample.model';
import { CurrentFile } from '../models/current-file.model';


@Injectable({
  providedIn: 'root'
})
export class ComponentCommunicationService {

  constructor() { }

  // Observable string sources
  private emitChangeSource = new Subject<any>();
  // Observable string streams
  changeEmitted$ = this.emitChangeSource.asObservable();
  // Service message commands
  emitChange(change: any) {
      this.emitChangeSource.next(change);
  }

  private emitChangePlayer = new Subject<any>();
  changeEmittedFromPlayer$ = this.emitChangePlayer.asObservable();
  emitChangeFromPlayer(change: any) {
    this.emitChangePlayer.next(change);
  }

  //App Component notifies Bordercontents Music Player and Contents (Play and Pause Buttons) Components when a BrowserRefresh happend. 
  private browserRefreshEvent = new Subject<any>();
  browserRefreshEventEmitted$ = this.browserRefreshEvent.asObservable();
  emitBrowserRefreshEvent(event: any) {
    this.browserRefreshEvent.next(event);
    
  }


  private discoverComponentIsReadyEvent = new Subject<any>();
  discoverComponentIsReadyEventEmitted$ = this.discoverComponentIsReadyEvent.asObservable();
  emitDiscoverComponentIsReady(event: any) {
    this.discoverComponentIsReadyEvent.next(event);
  }


  private sampleUploadEvent = new Subject<any>();
  sampleUploadEventEmitted$ = this.sampleUploadEvent.asObservable();
  emitSampleUploadStatus(event: boolean) {
    this.sampleUploadEvent.next(event);
  }

  private audioLoadComplete = new Subject<any>();
  audioLoadCompleteEvent$ = this.audioLoadComplete.asObservable();
  emitAudioLoaded() {
    this.audioLoadComplete.next();
  }


  private licensePointsSubject = new Subject<any>();
  licensePointsObservable$ = this.licensePointsSubject.asObservable();
  emitLicensePointsChanged(data: any) {
    this.licensePointsSubject.next(data);
  }

  private musicPlayerVisibilitySubject = new Subject<any>();
  musicPlayerVisibilityObservable$ = this.musicPlayerVisibilitySubject.asObservable();
  emitMusicPlayerVisibilityChanged() {
    this.musicPlayerVisibilitySubject.next();
  }

  private previousNextTrackSubject = new Subject<any>();
  previousNextTrackObservable$ = this.previousNextTrackSubject.asObservable();
  emitPreviousNextTrack(buttonName:string) {
    this.previousNextTrackSubject.next(buttonName);
  }


  public channelArtistWindow = new Subject<any>();
  artistWindowInfoEmitted$ = this.channelArtistWindow.asObservable();
  emitArtistInfo(file: any) {
    this.channelArtistWindow.next(file);
  }

  public filesSubject = new Subject<any>();
  filesObservable$ = this.filesSubject.asObservable();
  emitFiles(files: Array<Sample>) {
    this.filesSubject.next(files);
  }

  public isFilesSubject = new Subject<any>();
  isFilesObservable$ = this.isFilesSubject.asObservable();
  emitIsFiles(isFiles: boolean) {
    this.isFilesSubject.next(isFiles);
  }

  public currentFileSubject = new Subject<any>();
  currentFileObservable$ = this.currentFileSubject.asObservable();
  emitCurrentFile(currentFile: CurrentFile) {
    this.currentFileSubject.next(currentFile);
  }

  public sidenavSubject = new Subject<any>();
  sidenavObservable$ = this.sidenavSubject.asObservable();
  emitSidenavChanged() {
    this.sidenavSubject.next();
  }

  public toggleSidenavSubject = new Subject<any>();
  toggleSidenavObservable$ = this.toggleSidenavSubject.asObservable();
  emitToggleSidenav() {
    this.toggleSidenavSubject.next();
  }

  public searchMenuSubject = new Subject<any>();
  searchMenuObservable$ = this.searchMenuSubject.asObservable();
  emitSearchMenuOpend() {
    this.searchMenuSubject.next();
  }



}
