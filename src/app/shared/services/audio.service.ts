import { Theme } from './../enums/theme.enum';
import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable, Subscription, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlayStateControlService } from './play-state-control.service';
import { Sample } from '../models/sample.model';
import { CurrentFile } from '../models/current-file.model';
import WaveSurfer from 'wavesurfer.js/dist/wavesurfer.js';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.js';
import { AudioState } from '../models/audio-state.model';
import { ComponentCommunicationService } from './component-communication.service';
import { AudioUnit } from '../models/audio-unit.model';
import { Track } from '../models/track.model';

@Injectable({
  providedIn: 'root'
})
export class AudioService implements OnDestroy {

  public audioServiceDestroyed$: Subject<void> = new Subject<void>();
  private subjectAudioFile = new Subject<Array<any>>();
  audioFileEmitted$ = this.subjectAudioFile.asObservable();

  audioFileSubscription: Subscription;
  currentTime: number;
  duration: number;
  private _playState: boolean;

  public audioUnitSubject: Subject<Array<Sample | Track>> = new Subject<Array<Sample | Track>>();
  audioUnits$: Observable<Array<Sample | Track>> = this.audioUnitSubject.asObservable();
  public emitAudioUnits(audioUnits: Array<Sample | Track>): void {
    this.audioUnitSubject.next(audioUnits);
  }

  public audioUnitsLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  


  constructor(
    private compComService: ComponentCommunicationService,
    private playStateControlService: PlayStateControlService,
  ) {
    this.playStateControlService.playState$.pipe(
      takeUntil(this.playStateControlService.playStateServiceDestroyed$)
    ).subscribe((playState: boolean) => {
      this.playState = playState;
    });
  }

  ngOnDestroy(): void {
    this.audioServiceDestroyed$.next();
  }


  public wavesurfer;

  public isPlayerReady = false;
  onReadylistener;
  counter: number = 0;
  public audioState = new Subject<any>();
  audioState$ = this.audioState.asObservable();

  emitAudioState(state: AudioState) {
    this.audioState.next(state);
  }

  emitAudioUnitsLoading(value: boolean) {
    this.audioUnitsLoading$.next(value);
  }


  play() {
    this.wavesurfer.play();
  }

  pause() {
    this.wavesurfer.pause();
  }

  stop() {
    this.wavesurfer.stop();
  }



  createWavesurferObj(theme: Theme) {
    // this.wavesurfer = null;
    if (this.wavesurfer) {
      this.wavesurfer.destroy();
    }
    let progressColor: string;
    switch(theme) {
      case Theme.PRIMARY:
        progressColor = window.getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        break;
      case Theme.ACCENT:
        progressColor = window.getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
        break;
      case Theme.BODY:
        progressColor = window.getComputedStyle(document.documentElement).getPropertyValue('--body-color');
        break;  
      default:
        progressColor = window.getComputedStyle(document.documentElement).getPropertyValue('--body-color');  
    }
    this.wavesurfer = WaveSurfer.create({
      container: '#waveform',
      barWidth: 3,
      barRadius: 1,
      hideScrollbar: true,
      cursorWidth: 3,
      // scrollParent: true,
      barGap: 2,
      barHeight: 1.5,
      // // container: '#waveform',
      backend: 'WebAudio',
      height: 40,
      fillParent: true,
      backgroundColor: '#ededed',
      // // progressColor: '#03a9f4',
      // #051136
      // #0081ff
      // '#d69090'
      progressColor: progressColor,
      responsive: true,
      // waveColor: 'transparent',
      waveColor: 'rgb(202,202,202)',
      // waveColor: '#dce6dd',
      // zoom: 50,
      // cursorColor: '#efefef',
      cursorColor: '#658566',
      // cursorWidth: 3,
      plugins: [
        // TimelinePlugin.create({
        //   // plugin options ...
        //   container: '#timeline',
        //   unlabeledNotchColor: this.whiteColor,
        //   primaryColor: '#03a9f4',
        //   secondaryColor: this.primaryColor,
        //   secondaryFontColor: this.whiteColor,
        //   // timeInterval: 0.5
        // }),
        CursorPlugin.create({
          // plugin options ...
          color: 'black',
          customShowTimeStyle: {
            // 'background-color': 'black',
            'color': 'black',
            'font-weight': '900',
            padding: '2px',
            'font-size': '14px',
          },
          showTime: true,
          style: 'solid',
          followCursorY: true
        })

      ]
    });
    this.wavesurfer.on('seek', () => {
      console.log('AudioTrack Paused');
      // this.wavesurfer.setCurrentTime(0);
      // this.playStateControlService.savePlayState(false);
      // // this.changeDetectorRef.markForCheck()
      if (this.playState) {
        this.play();
      }
      // this.emitAudioState({
      //   status: "finish",
      //   currentTime: 0,
      //   duration: 0
      // });
    });

    this.wavesurfer.on('pause', () => {
      console.log('AudioTrack Paused');
      // this.wavesurfer.setCurrentTime(0);
      // this.playStateControlService.savePlayState(false);

      // // this.changeDetectorRef.markForCheck()
      this.emitAudioState({
        status: "finish",
        currentTime: 0,
        duration: 0
      });
    });

    this.wavesurfer.on('finish', () => {
      console.log('AudioTrack FInished');
      // this.playStateControlService.savePlayState(false);
      this.playStateControlService.emitPlayState(false);
      setTimeout(() => {
        this.wavesurfer.setCurrentTime(0);
      }, 100)
      // this.changeDetectorRef.markForCheck()
      this.emitAudioState({
        status: "finish",
        currentTime: 0,
        duration: 100
      });
    });
    this.wavesurfer.on("audioprocess", (mycurrentTime: number) => {
      this.counter++;
      if (this.counter === 10) {

        this.emitAudioState({
          status: "playing",
          currentTime: this.wavesurfer.getCurrentTime(),
          duration: this.wavesurfer.getDuration() as number
        });
        this.counter = 0;
      }

    });
    this.wavesurfer.on("ready", () => {
      this.isPlayerReady = true;
      this.compComService.emitAudioLoaded();
      if (this.playState) {

        this.play();
      }

    });

    console.log(this.wavesurfer);

  }

  getTrackLength(): Observable<number> {
    return this.wavesurfer.getDuration();
  }


  loadAudio(audioUnitID: string): void {
    this.isPlayerReady = false;
    this.wavesurfer.load(`http://localhost:9090/api/web/public/media/audio/${audioUnitID}`);

    //  let load =  this.wavesurfer.load(`http://localhost:9090/api/samplepool/downloadFile/${userName}/${fileName}`); 
  }

  toggleMute() {
    this.wavesurfer.toggleMute();
  }

  getMute() {
    return this.wavesurfer.getMute();
  }

  loadPlayAudio(audioUnitID: string): void {
    this.isPlayerReady = false;
    this.wavesurfer.load(`http://localhost:9090/api/web/public/media/audio/${audioUnitID}`);
    // this.wavesurfer.load(`http://localhost:9090/api/samplepool/downloadFile/${userName}/${fileName}`); 
  }

  loadBlob(file): void {
    this.isPlayerReady = false;
    this.wavesurfer.loadBlob(file);
  }

  seekTo(percent: number) {
    this.wavesurfer.seekTo(percent);
  }

  getDuration() {
    return this.wavesurfer.getDuration();
  }

  getCurrentTime() {
    return this.wavesurfer.getCurrentTime();
  }

  // toggle = false;
  // setWaveColor(color: string) {
  //   if (this.toggle) {
  //     this.wavesurfer.setProgressColor(this.primaryColor);
  //     this.toggle = !this.toggle;
  //   } else {
  //     this.wavesurfer.setProgressColor(color);
  //     this.toggle = !this.toggle;

  //   }
  // }

  initAudioPlayer(audioUnits: Array<AudioUnit>, theme: Theme) {
    if (this.playStateControlService.getPlayState()) {
      this.playStateControlService.emitPlayState(false);
    }
    // this.loader.close();
    if(audioUnits.length > 0) {
      this.createWavesurferObj(theme);
      this.loadPlayAudio(audioUnits[0].audioUnitID);
    }
  }





  private audioStateViewUpdate = new Subject<any>();
  audioStateViewUpdateEmitted$ = this.audioStateViewUpdate.asObservable();
  emitAudioStateUpdate(currentFile: CurrentFile) {
    this.audioStateViewUpdate.next(event);
  }






  private subjectPausePressed = new Subject<any>();
  subjectPausePressedEmitted$ = this.subjectPausePressed.asObservable();
  emitPausePressed() {
    this.subjectPausePressed.next();
  }

  emitAudioFile(audioFile: Sample, index: number) {
    let audioContainerArray: Array<any> = [];
    audioContainerArray.push(audioFile);
    audioContainerArray.push(index);
    this.subjectAudioFile.next(audioContainerArray);
  }

  set playState(playState: boolean) {
    this._playState = playState;
  }

  get playState(): boolean {
    return this._playState;
  }


}



