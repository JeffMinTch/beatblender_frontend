import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { CheckoutRoutes } from './checkout.routing';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(CheckoutRoutes),
    SharedModule,
    // NgxPaginationModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CheckoutModule { }
