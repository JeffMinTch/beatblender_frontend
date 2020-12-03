import { Directive, Host, Optional, Self } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appSidenavToggle]'
})
export class SidenavToggleDirective {

  isMobile;
  screenSizeWatcher: Subscription;
  constructor(
    private mediaObserver: MediaObserver,
    @Host() @Self() @Optional() 
    public sideNav: MatSidenav
    ) { 
      console.log('Initalisiert');
  }

  ngOnInit() {
    this.initSideNav();
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
