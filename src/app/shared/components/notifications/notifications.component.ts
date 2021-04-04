import { SampleLicensingMarketService } from '../../../views/licensing/sample-licensing-market.service';
// import { SampleLicensingMarketRoutes } from '../../../views/licensing/licensing.routing';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent implements OnInit {
  
  @Input() notificPanel;
  
  public categories$: Observable<any>;
  public genres$: Observable<string[]>;
  public filterForm: FormGroup;
  public activeCategory: string = 'all';
  public activeGenre: string ='all';

  
  
  // Dummy notifications
  notifications = [{
    message: 'New contact added',
    icon: 'assignment_ind',
    time: '1 min ago',
    route: '/inbox',
    color: 'primary'
  }, {
    message: 'New message',
    icon: 'chat',
    time: '4 min ago',
    route: '/chat',
    color: 'accent'
  }, {
    message: 'Server rebooted',
    icon: 'settings_backup_restore',
    time: '12 min ago',
    route: '/charts',
    color: 'warn'
  }]

  constructor(
    private router: Router, 
    private sampleLicensingMarketService: SampleLicensingMarketService,
    private fb: FormBuilder
    ) {}

  ngOnInit() {
    this.router.events.subscribe((routeChange) => {
        if (routeChange instanceof NavigationEnd) {
          this.notificPanel.close();
        }
    });
    this.categories$ = this.sampleLicensingMarketService.getCategories();
    this.genres$ = this.sampleLicensingMarketService.getGenres();
    this.buildFilterForm(this.sampleLicensingMarketService.initialFilters);

  }
  clearAll(e) {
    e.preventDefault();
    this.notifications = [];
  }
  buildFilterForm(filterData: any = {}) {
    this.filterForm = this.fb.group({
      search: [''],
      category: ['all'],
      genre: ['all'],
      minPrice: [filterData.minPrice],
      maxPrice: [filterData.maxPrice],
      minRating: [filterData.minRating],
      maxRating: [filterData.maxRating]
    })
  }

  setActiveCategory(category) {
    this.activeCategory = category;
    this.filterForm.controls['category'].setValue(category)
  }

  setActiveGenre(genre: string) {
    this.activeGenre = genre;
    this.filterForm.controls['genre'].setValue(genre)
  }

  
  // searchMusic() {
  //   console.log('Music searching...');
  //   // this.stateManagerService.setIsAudioFiles(null);
  //   this.cloudService.searchMusic(
  //     this.selectedGenres,
  //     this.selectedRegions,
  //     this.selectedTrackTypes,
  //     this.selectedSongKeys,
  //     this.bpmMinMaxValues,
  //     this.yearMinMaxValues
  //   ).subscribe((serverFiles) => {
  //     console.log('Successfull Music Searching Request');
  //     this.handleServerFiles(serverFiles);
  //   }, (error) => {
  //     console.log(error);
  //   });
  // }
}
