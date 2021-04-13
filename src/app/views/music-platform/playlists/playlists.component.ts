import { SampleLicensingMarketService } from './../../licensing/sample-licensing-market.service';
import { Component, OnInit } from '@angular/core';
import { PlayStateControlService } from 'app/shared/services/play-state-control.service';
import { AudioService } from 'app/shared/services/audio.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { LocalStoreService } from 'app/shared/services/local-store.service';
import { map, share, takeUntil } from 'rxjs/operators';
import { Sample } from 'app/shared/models/sample.model';
import { HttpErrorResponse } from '@angular/common/http';
import { egretAnimations } from 'app/shared/animations/egret-animations';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
  animations: [egretAnimations],

})
export class PlaylistsComponent implements OnInit {


  private playState: boolean;

  count:number = 0;
  
  page: number = 1;
  pageSize: number = 12;
  sortBy: string = 'title';

  constructor(
    public sampleLicensingMarketService: SampleLicensingMarketService,
    public playStateControlService: PlayStateControlService,
    private audioService: AudioService,
    private loader: AppLoaderService,
    private jwt: JwtAuthService,
    private ls: LocalStoreService,
  ) { }

  ngOnInit(): void {
    this.sampleLicensingMarketService.samples$.pipe(
      // debounceTime(500),
      map((samples: Array<Sample>) => {
        if (this.playState) {
          this.playStateControlService.emitPlayState(false);
        }
        this.loader.close();
        if(samples.length > 0) {
          this.audioService.createWavesurferObj();
          this.audioService.loadPlayAudio(samples[0].sampleID);
        }
        return samples;
      }),
      takeUntil(this.sampleLicensingMarketService.sampleLicensingMarketDestroyed$),
    ).subscribe((samples: Array<Sample>) => {
      if(samples.length > 0) {
        this.initCurrentFile(samples[0].sampleID);
      }
    });
  
    
    this.retrieveSamples();
  }

  public retrieveSamples(): void {
    const params = this.sampleLicensingMarketService.getRequestParams(this.sortBy, this.page, this.pageSize);
    this.sampleLicensingMarketService.getAudioFiles(params).pipe(
      share(),
    ).subscribe((response) => {
      console.log("Response");
      console.log(response);
      const { samples, totalItems } = response;
      this.count = totalItems;
      this.sampleLicensingMarketService.samples$.next(samples);
      // this.dataSource = new MatTableDataSource(samples);
      
    }, (error) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          this.ls.clear();
          this.jwt.signin();
        }
      }
      console.log(error);
    });
  }

  initCurrentFile(sampleID: string) {
    // this.playStateControlService.saveIDCurrentPlayElement(sampleID);
    this.playStateControlService.emitCurrentSampleID(sampleID);
  }


}
