import { LayoutService, ILayoutConf } from './../../../shared/services/layout.service';
import { Component, OnInit, ViewChild, AfterViewInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-licensing',
  templateUrl: './licensing.component.html',
  styleUrls: ['./licensing.component.scss']
})
export class LicensingComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSidenav) private sideNav: MatSidenav;
  layoutConf: ILayoutConf;

  constructor(
    private layout: LayoutService,
    private cdr: ChangeDetectorRef
  ) { }
  
  ngOnInit(): void {
    
  }
  
  ngAfterViewInit(): void {
    
    // this.sideNav.opened = false;
  }

  

}
