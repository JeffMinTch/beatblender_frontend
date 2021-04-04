import { MyLicensesComponent } from './my-licenses.component';
import { MyLicensesRoutes } from './my-licenses.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'app/shared/shared.module';
import { BasicLicensesComponent } from './basic-licenses/basic-licenses.component';
import { ExtendedLicensesComponent } from './extended-licenses/extended-licenses.component';



@NgModule({
  declarations: [MyLicensesComponent, BasicLicensesComponent, ExtendedLicensesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(MyLicensesRoutes),
    FlexLayoutModule,
    SharedModule,
  ]
})
export class MyLicensesModule { }
