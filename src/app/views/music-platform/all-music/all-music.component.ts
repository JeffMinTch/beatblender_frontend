import { SampleLicensingMarketService } from './../../sample-licensing-market/sample-licensing-market.service';
import { Component, OnInit } from '@angular/core';
import { Sample } from 'app/shared/models/sample.model';

@Component({
  selector: 'app-all-music',
  templateUrl: './all-music.component.html',
  styleUrls: ['./all-music.component.scss']
})
export class AllMusicComponent implements OnInit {

  public samples: Array<Sample>;

  constructor(public sampleLicensingMarketService: SampleLicensingMarketService) { }

  ngOnInit(): void {
    this.sampleLicensingMarketService.samples$.subscribe((samples: Array<Sample>) => {
      this.samples = samples;
    });
    // this.sampleLicensingMarketService.getAudioFiles().subscribe
  }

}
