import { UserInfo } from 'angular-oauth2-oidc';
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";
import { User } from '../../shared/models/user.model';
import { Observable, Subscription } from 'rxjs';
import { ILayoutConf, LayoutService } from 'app/shared/services/layout.service';
import { NavigationService } from 'app/shared/services/navigation.service';
import { egretAnimations } from 'app/shared/animations/egret-animations';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
})
export class ProfileComponent implements OnInit {


  public panelOpenState = false;

  public accountItems: any[];
  public hasIconTypeMenuItem: boolean;
  public iconTypeMenuTitle: string;
  private menuItemsSub: Subscription;
  public layoutConf: ILayoutConf;



  activeView: string = "overview";
  userInfo: Observable<UserInfo>;
  // Doughnut
  doughnutChartColors: any[] = [
    {
      backgroundColor: ["#fff", "rgba(0, 0, 0, .24)"],
    },
  ];

  total1: number = 500;
  data1: number = 200;
  doughnutChartData1: number[] = [this.data1, this.total1 - this.data1];

  total2: number = 1000;
  data2: number = 400;
  doughnutChartData2: number[] = [this.data2, this.total2 - this.data2];

  doughnutChartType = "doughnut";
  doughnutOptions: any = {
    cutoutPercentage: 85,
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      display: false,
      position: "bottom",
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    tooltips: {
      enabled: false,
    },
  };

  constructor(private router: ActivatedRoute, public jwtAuth: JwtAuthService,private navService: NavigationService,
    private layout: LayoutService) {}

  ngOnInit() {
    this.activeView = this.router.snapshot.params["view"];
    this.userInfo = this.jwtAuth.user$;


    this.iconTypeMenuTitle = this.navService.iconTypeMenuTitle;
    this.menuItemsSub = this.navService.accountItems$.subscribe(accountItem => {
      this.accountItems = accountItem;
      //Checks item list has any icon type.
      this.hasIconTypeMenuItem = !!this.accountItems.filter(
        item => item.type === "icon"
      ).length;
    });
    this.layoutConf = this.layout.layoutConf;
  }
}
