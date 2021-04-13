import { PlayStateControlService } from './../../services/play-state-control.service';
import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Sample } from 'app/shared/models/sample.model';
import { AudioService } from 'app/shared/services/audio.service';
import { AudioState } from 'app/shared/models/audio-state.model';

export type AudioPanelType = 'primary' | 'sample' | 'playlist';

@Component({
  selector: 'app-audio-panel',
  templateUrl: './audio-panel.component.html',
  styleUrls: ['./audio-panel.component.scss']
})
export class AudioPanelComponent implements OnInit {

  @Input() sample: Sample;
  @Input() type: AudioPanelType;

  public playState: boolean;
  public currentSampleID: string;

  constructor(
    public playStateControlService: PlayStateControlService,
    private audioService: AudioService,
    private changeDetectorRef: ChangeDetectorRef
    ) { }

  ngOnInit(): void {

    this.playStateControlService.playState$.pipe(
      takeUntil(this.playStateControlService.playStateServiceDestroyed$)
    ).subscribe((playState: boolean) => {
      this.playState = playState;
    });
    this.playStateControlService.currentSampleID$.pipe(
      takeUntil(this.playStateControlService.playStateServiceDestroyed$)
    ).subscribe((currentSampleID: string) => {
      this.currentSampleID = currentSampleID;
    });

    this.audioService.audioState$.pipe(takeUntil(this.audioService.audioServiceDestroyed$)).subscribe((state: AudioState) => {
      switch (state.status) {
        case 'finish':
          this.changeDetectorRef.detectChanges();
          break;
        case 'playing':
          break;
        case 'pause':
          this.changeDetectorRef.detectChanges();
          break;
      }
    });


  }

  play(isCurrentSample: boolean, sampleID: string): void {
    if (isCurrentSample) {
      this.playStateControlService.emitPlayState(true);
      this.audioService.play();
      console.log('play yes');
    } else {
      this.playStateControlService.emitPlayState(true);
      this.audioService.loadPlayAudio(sampleID);
      // setTimeout(() => {
      this.playStateControlService.emitCurrentSampleID(sampleID);
      // });
      console.log('play no');
    }
  }

  pause(isCurrentSample: boolean, sampleID: string): void {
    if (isCurrentSample) {
      this.playStateControlService.emitPlayState(false);
      this.audioService.pause();
      console.log('pause yes');
    } else {
      this.playStateControlService.emitCurrentSampleID(sampleID);
      this.audioService.loadPlayAudio(sampleID);
      console.log('pause no');

    }

  }


}
