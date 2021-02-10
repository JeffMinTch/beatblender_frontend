import { takeUntil } from 'rxjs/operators';
import { ComponentCommunicationService } from './../../services/component-communication.service';
import { SampleLicensingMarketService } from './../../../views/sample-licensing-market/sample-licensing-market.service';
import { PlayStateControlService } from './../../services/play-state-control.service';
import { Subscription, Observable } from 'rxjs';
import { AudioService } from './../../services/audio.service';
import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Sample } from 'app/shared/models/sample.model';
import { CurrentFile } from 'app/shared/models/current-file.model';
import { AudioState } from 'app/shared/models/audio-state.model';
import { map, share } from 'rxjs/operators';
import { createTrue } from 'typescript';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit, AfterViewInit {

  private samples: Array<Sample>;
  private currentSampleID: string;
  isMuted: boolean = false;
  audioStateSubscription: Subscription;
  sampleSubscription: Subscription;
  // samples$: Observable<Sample[]>;
  audioLoadCompleteSubscription: Subscription;
  public initIcons: boolean = false;


  constructor(
    private audioService: AudioService,
    public playStateControlService: PlayStateControlService,
    public changeDetectorRef: ChangeDetectorRef,
    public sampleLicensingMarketService: SampleLicensingMarketService,
    private componentCommunicationService: ComponentCommunicationService,
    ) {

    this.audioStateSubscription = this.audioService.audioState$.pipe(
      takeUntil(this.audioService.audioServiceDestroyed$)
    ).subscribe((state: AudioState) => {
      switch (state.status) {
        case "finish":
          this.changeDetectorRef.detectChanges();
          break;
        case "playing":
          break;
      }
    });

    this.audioLoadCompleteSubscription = this.componentCommunicationService.audioLoadCompleteEvent$.pipe(
      takeUntil(this.audioService.audioServiceDestroyed$)
    ).subscribe(() => {
      this.changeDetectorRef.detectChanges();
    });

    this.sampleLicensingMarketService.samples$.pipe(
      takeUntil(this.sampleLicensingMarketService.sampleLicensingMarketDestroyed$)
    ).subscribe((samples: Sample[]) => {
      this.samples = samples;
      // this.changeDetectorRef.detectChanges();

    });

   

    this.playStateControlService.currentSampleID$.pipe(
      takeUntil(this.playStateControlService.playStateServiceDestroyed$)
    ).subscribe((currentSampleID: string) => {
      this.currentSampleID = currentSampleID;
      // this.changeDetectorRef.detectChanges();
    });
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.initIcons = true;

  }

  ngOnChanges() {
    // this.changeDetectorRef.detectChanges();
  }

  play() {
    // this.playStateControlService.savePlayState(true);
    this.playStateControlService.emitPlayState(true);
    this.audioService.play();
    this.changeDetectorRef.detectChanges();
  }

  pause() {
    // this.playStateControlService.savePlayState(false);
    this.playStateControlService.emitPlayState(false);
    this.audioService.pause();
    this.changeDetectorRef.detectChanges();
  }

  isSamples(): boolean {
    if (this.sampleLicensingMarketService.getSamples()) {
      return false;
    } else {
      return true;
    }
  }

  previousNext(buttonName) {
    let newActiveSampleIndex: number;
    const activeSampleIndex: number = this.samples.findIndex(sample => sample.sampleID === this.currentSampleID);
    switch (buttonName) {
      case 'prev':
        newActiveSampleIndex = activeSampleIndex - 1;
        break;
      case 'next':
        newActiveSampleIndex = activeSampleIndex + 1;
        break;
    }
    this.loadAudio(this.samples[newActiveSampleIndex].sampleID);
    this.playStateControlService.emitCurrentSampleID(this.samples[newActiveSampleIndex].sampleID);
    // this.playStateControlService.saveIDCurrentPlayElement(this.samples[newActiveSampleIndex].sampleID);
    this.changeDetectorRef.detectChanges();
  }

  findSampleIndex(samples: Sample[]): number {
    const activeSample: Sample = samples.find(sample => sample.sampleID === this.playStateControlService.getIDCurrentPlayElement())
    const activeSampleIndex: number = samples.findIndex(sample => sample === activeSample);
    return activeSampleIndex;
  }

  loadAudio(sampleID: string):void {
    this.audioService.loadAudio(sampleID);
  }

  isFirst(): boolean {
    if (this.samples) {
      if (this.samples.findIndex(sample => sample.sampleID === this.currentSampleID)===0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
    // if (this.sampleLicensingMarketService.getSamples()) {
    //   const activeSampleIndex: number = this.findSampleIndex(this.sampleLicensingMarketService.getSamples());
    //   return activeSampleIndex === 0;
    // } else {
    //   return false;
    // }
  }

  isLast():boolean {
    if(this.samples) {
      if(this.samples.findIndex(sample => sample.sampleID === this.currentSampleID) === this.samples.length -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  getMute(): boolean {
    if (this.audioService.isPlayerReady) {
      return this.audioService.getMute();
    } else {
      return false;
    }
  }

  toggleMute() {
    if (this.audioService.isPlayerReady) {
      this.audioService.toggleMute();
    }
  }

}
