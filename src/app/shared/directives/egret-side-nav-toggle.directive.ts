import { LayoutService, ILayoutConf } from 'app/shared/services/layout.service';
import { Directive, Host, Self, Optional, OnDestroy, OnInit, SkipSelf, ChangeDetectorRef } from '@angular/core';
import { MediaChange, MediaObserver } from "@angular/flex-layout";
import { Subscription } from "rxjs";
import { MatSidenav } from '@angular/material/sidenav';


@Directive({
  selector: '[EgretSideNavToggle]'
})
export class EgretSideNavToggleDirective implements OnInit, OnDestroy {
  isMobile;
  screenSizeWatcher: Subscription;
  constructor(
    private mediaObserver: MediaObserver,
    @Host() @Self() @Optional() 
    public sideNav: MatSidenav,
    private layout: LayoutService,
    // private cdr: ChangeDetectorRef
    ) { 
      // console.log('Initalisiert');
  }

  ngOnInit() {
    this.initSideNav();

  }
  
  ngAfterViewInit() {
      

  }

  ngOnDestroy() {
    if(this.screenSizeWatcher) {
      this.screenSizeWatcher.unsubscribe()
    }
  }

  updateSidenav() {
    var self = this;
    setTimeout(() => {
      self.sideNav.opened = !self.isMobile;
      self.sideNav.mode = self.isMobile ? 'over' : 'side';
      console.log('sidenav updatet');
    })
  }
  initSideNav() {
    
    this.isMobile = this.mediaObserver.isActive('xs') || this.mediaObserver.isActive('sm');
    // console.log(this.isMobile)
    this.updateSidenav();
    this.screenSizeWatcher = this.mediaObserver.media$.subscribe((change: MediaChange) => {
      this.isMobile = (change.mqAlias == 'xs') || (change.mqAlias == 'sm');
      this.updateSidenav();
    });
  }

  



}
