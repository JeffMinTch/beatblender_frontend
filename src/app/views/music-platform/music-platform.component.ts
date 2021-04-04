import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ILayoutConf, LayoutService } from 'app/shared/services/layout.service';
import { NavigationService } from 'app/shared/services/navigation.service';
import { Subscription } from 'rxjs';
import {share } from 'rxjs/operators';

@Component({
  selector: 'app-music-platform',
  templateUrl: './music-platform.component.html',
  styleUrls: ['./music-platform.component.scss']
})
export class MusicPlatformComponent implements OnInit {



  public panelOpenState = false;

  public listenItems: any[];
  public hasIconTypeMenuItem: boolean;
  public iconTypeMenuTitle: string;
  private menuItemsSub: Subscription;
  public layoutConf: ILayoutConf;
 


  constructor(
    private navService: NavigationService,
    // public themeService: ThemeService,
    private layout: LayoutService,
    
  ) { }

  ngOnInit() {
    this.iconTypeMenuTitle = this.navService.iconTypeMenuTitle;
    this.menuItemsSub = this.navService.listenItems$.subscribe(sampleMarketItem => {
      this.listenItems = sampleMarketItem;
      //Checks item list has any icon type.
      this.hasIconTypeMenuItem = !!this.listenItems.filter(
        item => item.type === "icon"
      ).length;
    });
    this.layoutConf = this.layout.layoutConf;
  }

  

  


}
