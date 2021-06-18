import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Theme } from 'app/shared/enums/theme.enum';
import { Sample } from 'app/shared/models/sample.model';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { AudioService } from 'app/shared/services/audio.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { LocalStoreService } from 'app/shared/services/local-store.service';
import { PlayStateControlService } from 'app/shared/services/play-state-control.service';
import { HttpService } from 'app/shared/services/web-services/http.service';
import { SampleLicensingMarketService } from 'app/views/licensing/sample-licensing-market.service';
import { map, share, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-audio-manager',
  templateUrl: './audio-manager.component.html',
  styleUrls: ['./audio-manager.component.scss']
})
export class AudioManagerComponent implements OnInit, AfterViewInit {

  @ViewChildren('expansionPanel') expansionPanels: QueryList<MatExpansionPanel>;
  
  private playState: boolean;
  panelOpenState = false;

  page: number = 0;
  pageSize: number = 12;
  sortBy: string = 'title';
  count:number = 0;


  constructor(
    public sampleLicensingMarketService: SampleLicensingMarketService,
    private httpService: HttpService,
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
          this.audioService.createWavesurferObj(Theme.PRIMARY);
          this.audioService.loadPlayAudio(samples[0].sampleID);
        }
        return samples;
      }),
      takeUntil(this.sampleLicensingMarketService.sampleLicensingMarketDestroyed$),
    ).subscribe((samples: Array<Sample>) => {
      if(samples.length > 0) {
        this.initCurrentFile(samples[0].sampleID);
        setTimeout(() => {
          this.expansionPanels.first.open();
        });
      }
    });

    this.retrieveSamples();
    
  }
  
  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
  }



  public retrieveSamples(): void {
    const params = this.httpService.getRequestParams(this.sortBy, this.page, this.pageSize);
    this.sampleLicensingMarketService.initSamples(params).pipe(
      share(),
    ).subscribe((response) => {
      console.log("Response");
      console.log(response);
      const { samples, totalItems } = response;
      this.count = totalItems;
      this.sampleLicensingMarketService.samples$.next(samples);
      
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
