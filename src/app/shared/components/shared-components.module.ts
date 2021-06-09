import { SimpleDialogComponent } from './dialogs/simple-dialog/simple-dialog.component';
import { SimpleInputDialogComponent } from './dialogs/simple-input-dialog/simple-input-dialog.component';
import { SelectMixedinsDialogComponent } from './dialogs/select-mixedins-dialog/select-mixedins-dialog.component';
import { CreatePlaylistDialogComponent } from './dialogs/create-playlist-dialog/create-playlist-dialog.component';
import { PlaylistCardComponent } from './playlist-card/playlist-card.component';
import { BannerComponent } from './banner/banner.component';
import { HomeSectionComponent } from './home-section/home-section.component';
import { BenefitCardComponent } from './benefit-card/benefit-card.component';
import { QuestionCardComponent } from './question-card/question-card.component';
import { VisionCardComponent } from './vision-card/vision-card.component';
import { PlaylistToolbarComponent } from './playlist-toolbar/playlist-toolbar.component';
import { QuickAccessMenuComponent } from './quick-access-menu/quick-access-menu.component';
import { MinMaxSliderComponent } from './min-max-slider/min-max-slider.component';
import { SelectComponent } from './select/select.component';
import { AudioPanelComponent } from './audio-panel/audio-panel.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedMaterialModule } from '../shared-material.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SharedPipesModule } from '../pipes/shared-pipes.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedDirectivesModule } from '../directives/shared-directives.module';

// ONLY REQUIRED FOR **SIDE** NAVIGATION LAYOUT
import { HeaderSideComponent } from './header-side/header-side.component';
import { SidebarSideComponent } from './sidebar-side/sidebar-side.component';

// ONLY REQUIRED FOR **TOP** NAVIGATION LAYOUT
import { HeaderTopComponent } from './header-top/header-top.component';
import { SidebarTopComponent } from './sidebar-top/sidebar-top.component';

// ONLY FOR DEMO

// ALWAYS REQUIRED 
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { AppComfirmComponent } from '../services/app-confirm/app-confirm.component';
import { AppLoaderComponent } from '../services/app-loader/app-loader.component';
import { EgretSidebarComponent, EgretSidebarTogglerDirective } from './egret-sidebar/egret-sidebar.component';
import { EgretNotifications2Component } from './egret-notifications2/egret-notifications2.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxPaginationModule } from 'ngx-pagination';


const components = [
  HeaderTopComponent,
  SidebarTopComponent,
  SidenavComponent,
  NotificationsComponent,
  SidebarSideComponent,
  HeaderSideComponent,
  AdminLayoutComponent,
  AuthLayoutComponent,
  BreadcrumbComponent,
  AppComfirmComponent,
  AppLoaderComponent,
  EgretNotifications2Component,
  EgretSidebarComponent,
  FooterComponent,
  EgretSidebarTogglerDirective,
  SearchFilterComponent,
  SearchbarComponent,
  AudioPanelComponent,
  SelectComponent,
  MinMaxSliderComponent,
  QuickAccessMenuComponent,
  PlaylistToolbarComponent,
  VisionCardComponent,
  QuestionCardComponent,
  BenefitCardComponent,
  HomeSectionComponent,
  BannerComponent,
  PlaylistCardComponent,
  CreatePlaylistDialogComponent,
  SelectMixedinsDialogComponent,
  SimpleInputDialogComponent,
  SimpleDialogComponent
]

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    FlexLayoutModule,
    PerfectScrollbarModule,
    SharedPipesModule,
    SharedDirectivesModule,
    SharedMaterialModule,
    MatSliderModule,
    // FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatRippleModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatListModule,
NgxPaginationModule

  ],
  declarations: components,
  // entryComponents: [AppComfirmComponent, AppLoaderComponent, BottomSheetShareComponent],
  exports: components
})
export class SharedComponentsModule {}