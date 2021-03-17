import { DocsRoutes } from './documentation.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentationComponent } from './documentation.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [DocumentationComponent, IntroductionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(DocsRoutes),
    FlexLayoutModule,
    SharedModule,
  ]
})
export class DocumentationModule { }
