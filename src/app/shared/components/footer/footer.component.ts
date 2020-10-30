import { PlayStateControlService } from './../../services/play-state-control.service';
import { Subscription } from 'rxjs';
import { AudioService } from './../../services/audio.service';
import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Sample } from 'app/shared/models/sample.model';
import { CurrentFile } from 'app/shared/models/current-file.model';
import { AudioState } from 'app/shared/models/audio-state.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, AfterViewInit {

  isMuted: boolean = false;
  audioStateSubscription: Subscription;
  constructor(
    private audioService: AudioService,
    public playStateControlService: PlayStateControlService,
    public changeDetectorRef: ChangeDetectorRef
  ) {
    
    this.audioStateSubscription = this.audioService.audioState$.subscribe((state: AudioState) => {
      switch (state.status) {
        case "finish":
          // this.currentTime = state.currentTime;
          // this.changeToPlayViewFromContents();
          // this.playStateControlService.savePlayState(false);
          // this.componentCommunicationService.emitChangeFromPlayer(this.playStateControlService.getPlayState());
          this.changeDetectorRef.detectChanges();
          break;
        case "playing":
          // this.currentTime = state.currentTime;
          // this.duration = state.duration;
          // this.changeDetectorRef.detectChanges();
          break;
      }
    });
    // this.subscription = componentCommunicationService.changeEmitted$.subscribe(
    //   receivedPlayState => {
    //     this.playStateControlService.savePlayState(receivedPlayState);
    //     this.manageMusicPlayerVisibility();
    //   });

    // this.audioLoadCompleteSubscription = this.componentCommunicationService.audioLoadCompleteEvent$.subscribe(() => {
    //   this.duration = this.audioService.getDuration();
    //   this.changeDetectorRef.detectChanges();
    // });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.audioService.createWavesurferObj();

  }

  previousNext(buttonName) {
    // const myRange: ElementRef<any> = this.myRange;
    // this.renderer.setProperty(myRange, 'value', 0);
    // this.componentCommunicationService.emitPreviousNextTrack(buttonName);
  }

  changeToPlayView(event) {

    // this.playStateControlService.savePlayState(false);
    // this.componentCommunicationService.emitChangeFromPlayer(this.playStateControlService.getPlayState());
    // let pauseButton = event.currentTarget;
    // let playButton = pauseButton.previousSibling;
    // pauseButton.classList.add('disable-active');
    // playButton.classList.remove('disable-active');
    // this.audioService.pause();

  }


  changeToPauseView(event) {

    // this.playStateControlService.savePlayState(true);
    // this.componentCommunicationService.emitChangeFromPlayer(this.playStateControlService.getPlayState());  //this.playStateValueFromPlayer
    // let playButton = event.currentTarget;
    // let pauseButton = playButton.nextSibling;
    // playButton.classList.add('disable-active');
    // pauseButton.classList.remove('disable-active');
    // this.audioService.play();

  }

  isFirstPlaying() {
    // return this.playStateControlService.getCurrentFile().index === 0;
  }

  isLastPlaying() {
    // return this.playStateControlService.getCurrentFile().index === this.audioFiles.length -1;
  }

  toggleMute() {
    const muteStatus = this.audioService.toggleMute();
    if (this.audioService.getMute()) {
      this.isMuted = true;
    } else {
      this.isMuted = false;
    }
    console.log("Mute Status: " + muteStatus);
  }

  changeToPauseViewFromContents() {
    let playButton = document.querySelector('.player-play-icon');
    let pauseButton = document.querySelector('.player-pause-icon');

    if (playButton.classList.contains('disable-active') === false) {
      playButton.classList.add('disable-active');
    }
    if (pauseButton.classList.contains('disable-active') === true) {
      pauseButton.classList.remove('disable-active');
    }
  }

  changeToPlayViewFromContents() {

    let playButton = document.querySelector('.player-play-icon');
    let pauseButton = document.querySelector('.player-pause-icon');

    if (playButton.classList.contains('disable-active')) {
      playButton.classList.remove('disable-active');
    }

    if (pauseButton.classList.contains('disable-active') === false) {
      pauseButton.classList.add('disable-active');
    }

  }

  manageMusicPlayerVisibility() {
    if (this.playStateControlService.getPlayState()) {
      this.changeToPauseViewFromContents();
    } else {
      this.changeToPlayViewFromContents();
    }
  }

  populateArtistWindow(firstFile: Sample) {

    //populate artist data after page load in artist window
    // if (Object.keys(this.playStateControlService.getCurrentFile()).length > 0) {

    //   const file: CurrentFile = this.playStateControlService.getCurrentFile();
    //   this.displayArtistWindow(file);

    // } else {

    //   const file: AudioFile = firstFile;
    //   //if current file doesnt yet exist, display artist data of first element in files array 
    //   this.renderer.setProperty(this.soundbarTitleImg.nativeElement, 'src', file.img);
    //   this.renderer.setProperty(this.soundbarArtistName.nativeElement, 'innerHTML', file.artist);
    //   this.renderer.setProperty(this.soundbarAudioTitle.nativeElement, 'innerHTML', file.title);

    // }
  }

  displayArtistWindow(currentFile: CurrentFile) {

    //display artist data of current file in the right bottom artist window 
    // this.renderer.setProperty(this.soundbarTitleImg.nativeElement, 'src', currentFile.file.img);
    // this.renderer.setProperty(this.soundbarArtistName.nativeElement, 'innerHTML', currentFile.file.artist);
    // this.renderer.setProperty(this.soundbarAudioTitle.nativeElement, 'innerHTML', currentFile.file.title);

  }





}
