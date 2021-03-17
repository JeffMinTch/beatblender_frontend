import { Component, OnInit } from '@angular/core';
import { ILayoutConf, LayoutService } from 'app/shared/services/layout.service';
import { NavigationService } from 'app/shared/services/navigation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-basic-license-sidenav',
  templateUrl: './basic-license-sidenav.component.html',
  styleUrls: ['./basic-license-sidenav.component.scss']
})
export class BasicLicenseSidenavComponent implements OnInit {

  public panelOpenState = false;

  public sampleMarketItems: any[];
  public hasIconTypeMenuItem: boolean;
  public iconTypeMenuTitle: string;
  private menuItemsSub: Subscription;
  public layoutConf: ILayoutConf;

  constructor(
    private navService: NavigationService,
    // public themeService: ThemeService,
    private layout: LayoutService,
    // public jwtAuth: JwtAuthService,
  ) {}

  ngOnInit() {
    this.iconTypeMenuTitle = this.navService.iconTypeMenuTitle;
    this.menuItemsSub = this.navService.sampleMarketItems$.subscribe(sampleMarketItem => {
      this.sampleMarketItems = sampleMarketItem;
      //Checks item list has any icon type.
      this.hasIconTypeMenuItem = !!this.sampleMarketItems.filter(
        item => item.type === "icon"
      ).length;
    });
    this.layoutConf = this.layout.layoutConf;
    
  }

}
